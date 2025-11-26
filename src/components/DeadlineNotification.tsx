import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeadlineNotificationProps {
  isVisible: boolean;
  onDismiss: () => void;
  assignmentTitle: string;
  timeRemaining: string;
  urgencyLevel?: "high" | "medium" | "low";
}

export const DeadlineNotification = ({
  isVisible,
  onDismiss,
  assignmentTitle,
  timeRemaining,
  urgencyLevel = "medium",
}: DeadlineNotificationProps) => {
  const urgencyConfig = {
    high: {
      bgColor: "bg-destructive",
      textColor: "text-destructive-foreground",
      borderColor: "border-destructive",
      icon: AlertCircle,
    },
    medium: {
      bgColor: "bg-warning",
      textColor: "text-warning-foreground",
      borderColor: "border-warning",
      icon: Clock,
    },
    low: {
      bgColor: "bg-primary",
      textColor: "text-primary-foreground",
      borderColor: "border-primary",
      icon: Clock,
    },
  };

  const config = urgencyConfig[urgencyLevel];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <motion.div
            animate={urgencyLevel === "high" ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className={`${config.bgColor} ${config.textColor} rounded-xl shadow-2xl p-4 border-2 ${config.borderColor}`}
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: urgencyLevel === "high" ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 0.5, repeat: urgencyLevel === "high" ? Infinity : 0 }}
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
              </motion.div>
              
              <div className="flex-1">
                <h4 className="font-bold mb-1">Upcoming Deadline!</h4>
                <p className="text-sm opacity-90 mb-1">{assignmentTitle}</p>
                <p className="text-sm font-semibold">Due in: {timeRemaining}</p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className={`${config.textColor} hover:bg-white/20 p-1 h-auto`}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
