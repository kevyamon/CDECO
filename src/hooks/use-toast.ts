import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

const TOAST_TRANSLATIONS_EN: Record<string, string> = {
  "Erreur": "Error",
  "Erreur de chargement": "Loading Error",
  "Erreur de connexion": "Connection Error",
  "Erreur téléversement": "Upload Error",
  "Erreur lors de l'enregistrement": "Error Saving",
  "Erreur lors de la suppression": "Error Deleting",
  "Champs requis": "Required Fields",
  "Validation": "Validation Error",
  "Succès": "Success",
  "Statut mis à jour": "Status Updated",
  "Demande supprimée": "Application Deleted",
  "Message supprimé": "Message Deleted",
  "Paramètres enregistrés !": "Settings Saved!",
  "Photo téléversée": "Photo Uploaded",
  "Fichier téléversé": "File Uploaded",
  "Membre ajouté": "Member Added",
  "Membre mis à jour": "Member Updated",
  "Membre supprimé": "Member Deleted",
  "Document publié": "Document Published",
  "Document mis à jour": "Document Updated",
  "Document supprimé": "Document Deleted",
  "Événement supprimé !": "Event Deleted!",
  "Événement mis à jour avec succès !": "Event Updated Successfully!",
  "Nouvel événement créé et publié !": "New Event Published!",
  "Connexion réussie": "Login Successful",
  "Accès Administrateur": "Admin Portal Access",
  "Impossible de charger la liste des membres.": "Failed to load members list.",
  "Impossible d'actualiser les données d'administration.": "Failed to refresh administration data.",
  "Impossible de supprimer la demande.": "Failed to delete application.",
  "Impossible de supprimer le message.": "Failed to delete message.",
  "Impossible d'enregistrer les paramètres.": "Failed to save settings.",
  "Impossible de modifier l'état du message.": "Failed to update message status.",
  "L'image a été mise en ligne avec succès.": "Image uploaded successfully.",
  "Le document est prêt à être publié.": "The document is ready to be published.",
  "Les informations ont été enregistrées avec succès.": "Information saved successfully.",
  "Le profil a été retiré de la liste.": "Profile removed from list.",
  "Le document a été retiré avec succès.": "Document removed successfully.",
  "Échec de la mise à jour du statut.": "Failed to update status.",
  "La demande d'adhésion a été définitivement supprimée.": "Membership application was permanently removed.",
  "Le message a été supprimé de la boîte de réception.": "Message removed from inbox.",
  "Fichier requis": "File Required",
  "Nouveau média ajouté !": "New Media Added!",
  "Erreur de téléversement": "Upload Error",
  "Média supprimé": "Media Deleted",
  "Lien copié": "Link Copied",
  "Média remplacé avec succès !": "Media Replaced Successfully!",
  "Impossible de charger la médiathèque.": "Unable to load media gallery.",
  "Veuillez sélectionner un fichier image à téléverser.": "Please select an image file to upload.",
  "La ressource a été retirée du site.": "Resource was removed from the site.",
  "Le lien direct a été copié dans le presse-papiers.": "Direct link copied to clipboard.",
  "Échec du téléversement du média.": "Media upload failed.",
};

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const isEn =
    typeof window !== "undefined" &&
    (localStorage.getItem("i18nextLng") === "en" || document.documentElement.lang === "en");

  let title = props.title;
  let description = props.description;

  if (isEn) {
    if (typeof title === "string" && TOAST_TRANSLATIONS_EN[title]) {
      title = TOAST_TRANSLATIONS_EN[title];
    }
    if (typeof description === "string" && TOAST_TRANSLATIONS_EN[description]) {
      description = TOAST_TRANSLATIONS_EN[description];
    }
  }

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      title,
      description,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
