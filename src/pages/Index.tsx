import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CelebrationModal } from "@/components/CelebrationModal";
import { AssignmentCard } from "@/components/AssignmentCard";
import { AssignmentDetail } from "@/components/AssignmentDetail";
import { DeadlineNotification } from "@/components/DeadlineNotification";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Math Problem Set Chapter 5",
      subject: "Mathematics",
      dueDate: "Today, 5:00 PM",
      status: "pending" as const,
      isUrgent: true,
    },
    {
      id: 2,
      title: "Science Lab Report",
      subject: "Science",
      dueDate: "Tomorrow, 11:59 PM",
      status: "pending" as const,
      isUrgent: false,
    },
    {
      id: 3,
      title: "History Essay: World War II",
      subject: "History",
      dueDate: "Completed on Dec 15",
      status: "completed" as const,
      isUrgent: false,
    },
  ]);

  const { toast } = useToast();

  const handleComplete = (id: number) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "completed" as const } : a))
    );
    setShowCelebration(true);
    setSelectedAssignment(null);
  };

  const handleError = () => {
    toast({
      title: "Issue Reported",
      description: "Your teacher has been notified about the issue.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border-b border-border shadow-sm"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-3 rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">K-12 Learning Hub</h1>
                <p className="text-sm text-muted-foreground">Animation Strategy Demo</p>
              </div>
            </div>
            <Button
              onClick={() => setShowCelebration(true)}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Test Celebration
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">My Assignments</h2>
          <p className="text-muted-foreground">
            Interactive cards with status feedback and celebratory completions
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AssignmentCard
                {...assignment}
                onClick={() => setSelectedAssignment(assignment.id)}
                onComplete={() => handleComplete(assignment.id)}
                onError={handleError}
              />
            </motion.div>
          ))}
        </div>

        {/* Animation Strategies Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-card rounded-2xl p-8 border border-border shadow-lg"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Animation Strategies Implemented
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                <h4 className="font-semibold text-success mb-2">✨ Celebratory Completions</h4>
                <p className="text-sm text-muted-foreground">
                  Confetti burst + scale animations with point rewards
                </p>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-primary mb-2">🎯 Interactive Buttons</h4>
                <p className="text-sm text-muted-foreground">
                  Hover states, spring animations, and status feedback
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
                <h4 className="font-semibold text-warning mb-2">⏰ Deadline Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Slide-in toasts with urgency-based styling and animations
                </p>
              </div>
              <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                <h4 className="font-semibold text-accent mb-2">🎬 Smooth Transitions</h4>
                <p className="text-sm text-muted-foreground">
                  Staggered reveals, card hovers, and page animations
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        title="Assignment Complete!"
        message="Awesome work! You're making great progress."
        points={100}
      />

      {/* Deadline Notification */}
      <DeadlineNotification
        isVisible={showNotification}
        onDismiss={() => setShowNotification(false)}
        assignmentTitle="Math Problem Set Chapter 5"
        timeRemaining="3 hours"
        urgencyLevel="high"
      />

      {/* Assignment Detail View */}
      <AnimatePresence>
        {selectedAssignment && (
          <AssignmentDetail
            {...assignments.find((a) => a.id === selectedAssignment)!}
            onClose={() => setSelectedAssignment(null)}
            onComplete={() => handleComplete(selectedAssignment)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
