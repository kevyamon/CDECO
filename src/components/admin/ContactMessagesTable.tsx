import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Mail, MailOpen, MessageSquare, Search, Trash2, Reply } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface ContactMessagesTableProps {
  messages: ContactMessage[];
  onMarkAsRead: (id: string, isRead?: boolean) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
}

const ContactMessagesTable = ({
  messages,
  onMarkAsRead,
  onDelete,
}: ContactMessagesTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [readFilter, setReadFilter] = useState<string>("all");

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      `${message.name} ${message.email} ${message.subject} ${message.message}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesRead =
      readFilter === "all" ||
      (readFilter === "unread" && !message.is_read) ||
      (readFilter === "read" && message.is_read);
    return matchesSearch && matchesRead;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={readFilter} onValueChange={setReadFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filtrer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="unread">Non lus</SelectItem>
            <SelectItem value="read">Lus</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        {filteredMessages.length} message{filteredMessages.length !== 1 ? "s" : ""}
        {searchTerm || readFilter !== "all" ? " (filtré)" : ""}
      </p>

      {/* Table */}
      {filteredMessages.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p>Aucun message trouvé</p>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold w-12"></TableHead>
                <TableHead className="font-semibold">Expéditeur</TableHead>
                <TableHead className="font-semibold">Sujet</TableHead>
                <TableHead className="font-semibold max-w-xs">Aperçu</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow
                  key={message.id}
                  className={`hover:bg-muted/30 ${!message.is_read ? "bg-primary/5" : ""}`}
                >
                  <TableCell>
                    {message.is_read ? (
                      <MailOpen className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Mail className="h-4 w-4 text-primary" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className={`font-medium ${!message.is_read ? "text-foreground" : "text-muted-foreground"}`}>
                        {message.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={!message.is_read ? "font-medium" : ""}>
                        {message.subject}
                      </span>
                      {!message.is_read && (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          Nouveau
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm text-muted-foreground">
                      {message.message}
                    </p>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                    {formatDate(message.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      {/* View Message Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onMarkAsRead(message.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>{message.subject}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">
                                  {message.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{message.name}</p>
                                <p className="text-sm text-muted-foreground">{message.email}</p>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(message.created_at)}
                            </div>
                            <div className="p-4 bg-muted/30 rounded-lg">
                              <p className="whitespace-pre-wrap">{message.message}</p>
                            </div>
                            <Button asChild className="w-full gap-2">
                              <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
                                <Reply className="h-4 w-4" />
                                Répondre par email
                              </a>
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Reply Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        asChild
                      >
                        <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
                          <Reply className="h-4 w-4" />
                        </a>
                      </Button>

                      {/* Delete Button */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer le message de{" "}
                              <strong>{message.name}</strong> ?
                              Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(message.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ContactMessagesTable;
