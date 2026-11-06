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
import { CheckCircle, Clock, Eye, Search, Trash2, XCircle } from "lucide-react";
import ExportMenu from "./ExportMenu";
import { useExportData } from "@/hooks/useExportData";
import MembershipDetailDialog from "./MembershipDetailDialog";

interface MembershipRequest {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nationality: string;
  age: number;
  profession: string;
  organization: string;
  address: string;
  member_type: string;
  motivation: string;
  status: string;
  created_at: string;
}

interface MembershipRequestsTableProps {
  requests: MembershipRequest[];
  onUpdateStatus: (id: string, status: any) => void;
  onDelete: (id: string) => void;
}

const MembershipRequestsTable = ({
  requests,
  onUpdateStatus,
  onDelete,
}: MembershipRequestsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<MembershipRequest | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { exportToExcel, exportToPDF } = useExportData();

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      `${request.first_name} ${request.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const exportColumns = [
    { key: "first_name" as const, label: "Prénom" },
    { key: "last_name" as const, label: "Nom" },
    { key: "email" as const, label: "Email" },
    { key: "phone" as const, label: "Téléphone" },
    { key: "organization" as const, label: "Organisation" },
    { key: "profession" as const, label: "Profession" },
    { key: "member_type" as const, label: "Catégorie" },
    { key: "status" as const, label: "Statut" },
    { key: "created_at" as const, label: "Date" },
  ];

  const handleExportExcel = () => {
    exportToExcel(filteredRequests, exportColumns, {
      filename: "demandes-adhesion-cdeco",
      title: "Demandes d'Adhésion CDECO",
    });
  };

  const handleExportPDF = () => {
    exportToPDF(filteredRequests, exportColumns, {
      filename: "demandes-adhesion-cdeco",
      title: "Demandes d'Adhésion CDECO",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600 gap-1">
            <CheckCircle className="h-3 w-3" /> Approuvée
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" /> Refusée
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 gap-1">
            <Clock className="h-3 w-3" /> En attente
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const openDetails = (req: MembershipRequest) => {
    setSelectedRequest(req);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvées</SelectItem>
              <SelectItem value="rejected">Refusées</SelectItem>
            </SelectContent>
          </Select>
          <ExportMenu
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            disabled={filteredRequests.length === 0}
          />
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Demandeur</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Aucune demande trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">
                        {request.first_name} {request.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">{request.organization}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="text-muted-foreground">{request.email}</p>
                      <p className="text-muted-foreground">{request.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {request.member_type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDate(request.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openDetails(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {request.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-emerald-600 hover:text-emerald-700"
                            onClick={() => onUpdateStatus(request.id, "approved")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => onUpdateStatus(request.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer définitivement la demande de {request.first_name} {request.last_name} ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(request.id)}
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <MembershipDetailDialog
        request={selectedRequest}
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onUpdateStatus={onUpdateStatus}
        getStatusBadge={getStatusBadge}
      />
    </div>
  );
};

export default MembershipRequestsTable;
