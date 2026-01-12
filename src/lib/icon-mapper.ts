import { LucideIcon, HelpCircle } from "lucide-react";
import * as Icons from 'lucide-react';

export const getIconComponent = (iconName: string): LucideIcon => {

    const IconComponent = (Icons as any)[iconName];

    if (!IconComponent) {
        return HelpCircle;
    }

    return IconComponent as LucideIcon;
}