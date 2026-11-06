/**
 * =============================================================================
 * SECTION HEADER - Titre de section élégant avec ligne décorative
 * =============================================================================
 * 
 * Remplace les badges "pill" par un style plus professionnel
 */

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  className?: string;
  variant?: "default" | "light" | "accent";
}

const SectionHeader = ({ label, className, variant = "default" }: SectionHeaderProps) => {
  const textColorClass = {
    default: "text-primary",
    light: "text-white",
    accent: "text-accent"
  }[variant];

  const lineColorClass = {
    default: "bg-cdeco-orange",
    light: "bg-white/60",
    accent: "bg-accent"
  }[variant];

  return (
    <div className={cn("flex items-center justify-center gap-4 mb-6", className)}>
      <div className={cn("h-px w-12 md:w-16", lineColorClass)} />
      <span className={cn(
        "text-xs sm:text-sm font-bold uppercase tracking-[0.2em]",
        textColorClass
      )}>
        {label}
      </span>
      <div className={cn("h-px w-12 md:w-16", lineColorClass)} />
    </div>
  );
};

export default SectionHeader;
