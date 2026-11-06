import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, User, Briefcase, Building2, Heart } from "lucide-react";

interface MembershipDetailDialogProps {
  request: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (id: string, status: any) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

export const MembershipDetailDialog: FC<MembershipDetailDialogProps> = ({
  request,
  isOpen,
  onOpenChange,
  onUpdateStatus,
  getStatusBadge,
}) => {
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {request.first_name?.[0]}
                {request.last_name?.[0]}
              </span>
            </div>
            <div>
              <p>
                {request.first_name} {request.last_name}
              </p>
              <p className="text-sm font-normal text-muted-foreground">{request.organization}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{request.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Téléphone</p>
                <p className="font-medium">{request.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Adresse</p>
                <p className="font-medium">{request.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Nationalité & Âge</p>
                <p className="font-medium">
                  {request.nationality}, {request.age} ans
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Profession</p>
                <p className="font-medium">{request.profession}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Catégorie</p>
                <p className="font-medium">{request.member_type}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Heart className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Motivation</p>
              <p className="text-sm">{request.motivation}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Statut actuel</p>
              <div className="mt-1">{getStatusBadge(request.status)}</div>
            </div>
            <Select value={request.status} onValueChange={(value) => onUpdateStatus(request.id, value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuver</SelectItem>
                <SelectItem value="rejected">Refuser</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipDetailDialog;

