import {
  Smartphone,
  MessageCircle,
  Facebook,
  Twitter,
  UserCircle2,
  Globe,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
} from "lucide-react";

// Define the path data for each icon
const iconPaths = {
  Smartphone: "M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 16a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
  MessageCircle: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  Facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  X: "M4.5 3.75h15A1.75 1.75 0 0 1 21.25 5.5v13a1.75 1.75 0 0 1-1.75 1.75h-15A1.75 1.75 0 0 1 2.75 18.5v-13a1.75 1.75 0 0 1 1.75-1.75zm9.97 5.67-3.21 3.22 3.21 3.21a.75.75 0 1 1-1.06 1.06l-3.21-3.21-3.21 3.21a.75.75 0 0 1-1.06-1.06l3.21-3.21-3.21-3.22a.75.75 0 0 1 1.06-1.06l3.21 3.22 3.21-3.22a.75.75 0 0 1 1.06 1.06z",
  UserCircle2: "M18 20a6 6 0 0 0-12 0M12 12a6 6 0 1 0 0-12 6 6 0 0 0 0 12z",
  Globe: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM2.5 12h4.737c.098 2.842.516 5.392 1.179 7.293A8.001 8.001 0 0 1 2.5 12zm6.737 0h5.526c-.113 2.955-.591 5.5-1.263 7.293C12.841 17.5 12.363 14.955 12.25 12H9.237zm5.526-2H9.237c.113-2.955.591-5.5 1.263-7.293.659 1.793 1.137 4.338 1.25 7.293h3.013zm1.474-7.293c.663 1.901 1.081 4.451 1.179 7.293h4.737a8.001 8.001 0 0 0-5.916-7.293zM15.763 12c-.113 2.955-.591 5.5-1.263 7.293-.659-1.793-1.137-4.338-1.25-7.293h2.513z",
  Mail: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z",
  Github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  Linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z",
  Instagram: "M12 2H8C4.686 2 2 4.686 2 8v8c0 3.314 2.686 6 6 6h8c3.314 0 6-2.686 6-6V8c0-3.314-2.686-6-6-6h-4zm4.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.5 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-8a5 5 0 1 0 0 10 5 5 0 0 0 0-10z",
  Youtube: "M23 12c0 5.523-4.477 10-10 10S3 17.523 3 12 7.477 2 13 2s10 4.477 10 10zm-14.5 0l6-3.5v7l-6-3.5z",
  Phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
};

export const PREDEFINED_ICONS = [
  { id: "phone", icon: Smartphone, path: iconPaths.Smartphone, label: "Phone" },
  { id: "whatsapp", icon: MessageCircle, path: iconPaths.MessageCircle, label: "WhatsApp" },
  { id: "facebook", icon: Facebook, path: iconPaths.Facebook, label: "Facebook" },
  { id: "twitter", icon: Twitter, path: iconPaths.X, label: "X" },
  { id: "contact", icon: UserCircle2, path: iconPaths.UserCircle2, label: "Contact" },
  { id: "website", icon: Globe, path: iconPaths.Globe, label: "Website" },
  { id: "email", icon: Mail, path: iconPaths.Mail, label: "Email" },
  { id: "github", icon: Github, path: iconPaths.Github, label: "GitHub" },
  { id: "linkedin", icon: Linkedin, path: iconPaths.Linkedin, label: "LinkedIn" },
  { id: "instagram", icon: Instagram, path: iconPaths.Instagram, label: "Instagram" },
  { id: "youtube", icon: Youtube, path: iconPaths.Youtube, label: "YouTube" },
  { id: "call", icon: Phone, path: iconPaths.Phone, label: "Call" },
] as const;

export const QR_COLORS = [
  { id: "black", value: "#000000", label: "Black" },
  { id: "blue", value: "#2563eb", label: "Blue" },
  { id: "red", value: "#dc2626", label: "Red" },
  { id: "green", value: "#16a34a", label: "Green" },
  { id: "purple", value: "#9333ea", label: "Purple" },
  { id: "orange", value: "#ea580c", label: "Orange" },
  { id: "pink", value: "#db2777", label: "Pink" },
  { id: "teal", value: "#0d9488", label: "Teal" },
] as const;