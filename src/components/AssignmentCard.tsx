import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AssignmentStatus = "pending" | "completed" | "overdue";

interface AssignmentCardProps {
  title: string;
  subject: string;
  dueDate: string;
  status: AssignmentStatus;
  onComplete?: () => void;
  onError?: () => void;
  isUrgent?: boolean;
  onClick?: () => void;
}

export const AssignmentCard = ({
  title,
  subject,
  dueDate,
  status,
  onComplete,
  onError,
  isUrgent,
  onClick,
}: AssignmentCardProps) => {
  const statusConfig = {
    pending: {
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    completed: {
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    overdue: {
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className={`bg-card rounded-xl p-6 border-2 ${config.borderColor} shadow-lg hover:shadow-xl transition-all cursor-pointer ${
        isUrgent ? "animate-wiggle" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Badge variant="secondary" className="mb-2">
            {subject}
          </Badge>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Due: {dueDate}</span>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className={`${config.bgColor} p-3 rounded-full`}
        >
          <Icon className={`w-6 h-6 ${config.color}`} />
        </motion.div>
      </div>

      {status === "pending" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2"
        >
          <Button onClick={onComplete} className="flex-1" variant="default">
            Complete Assignment
          </Button>
          <Button onClick={onError} variant="destructive">
            Report Issue
          </Button>
        </motion.div>
      )}

      {status === "completed" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`${config.bgColor} p-3 rounded-lg text-center`}
        >
          <p className={`font-semibold ${config.color}`}>Assignment Completed! 🎉</p>
        </motion.div>
      )}

      {status === "overdue" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`${config.bgColor} p-3 rounded-lg text-center`}
        >
          <p className={`font-semibold ${config.color}`}>This assignment is overdue</p>
        </motion.div>
      )}
    </motion.div>
  );
};
