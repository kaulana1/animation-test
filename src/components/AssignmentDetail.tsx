import { motion } from "framer-motion";
import { X, Calendar, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AssignmentDetailProps {
  title: string;
  subject: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue";
  description?: string;
  onClose: () => void;
  onComplete?: () => void;
}

export const AssignmentDetail = ({
  title,
  subject,
  dueDate,
  status,
  description = "Complete the assigned tasks and submit your work before the deadline. Make sure to review all requirements carefully.",
  onClose,
  onComplete,
}: AssignmentDetailProps) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
      />

      {/* Detail Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/2 bg-card border-l border-border shadow-2xl z-50 overflow-y-auto"
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-3">
                {subject}
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-2">{title}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{dueDate}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            {status === "pending" && (
              <div className="flex items-center gap-2 bg-warning/10 text-warning p-3 rounded-lg border border-warning/20">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Pending Completion</span>
              </div>
            )}
            {status === "completed" && (
              <div className="flex items-center gap-2 bg-success/10 text-success p-3 rounded-lg border border-success/20">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Completed</span>
              </div>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Assignment Details
            </h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3"
          >
            {status === "pending" && onComplete && (
              <Button onClick={onComplete} className="flex-1">
                Mark as Complete
              </Button>
            )}
            <Button onClick={onClose} variant="outline" className="flex-1">
              {status === "pending" ? "Cancel" : "Close"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
