
import { Twitter, Facebook, Linkedin, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

type SocialSharePopoverProps = {
  shareUrl: string;
  title: string;
  imageUrl?: string;
  score?: number;
};

export const SocialSharePopover = ({ shareUrl, title, imageUrl, score }: SocialSharePopoverProps) => {
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`I just scored ${score}/100 on the 9-gauge assessment. What's your score?`);

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: <X className="w-5 h-5" />,
      color: "bg-white hover:bg-gray-100 text-black",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      color: "bg-[#4267B2] hover:bg-[#365899] text-white",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      color: "bg-[#0077b5] hover:bg-[#006399] text-white",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white",
      url: `instagram://library?AssetPath=${imageUrl}`,
    },
  ];

  const handleShare = (url: string) => {
    window.open(url, "_blank", "width=550,height=435");
  };

  return (
    <div className="flex items-center gap-3">
      {shareLinks.map((platform) => (
        <Button
          key={platform.name}
          size="lg"
          className={`rounded-full ${platform.color} shadow-lg transform transition-all duration-200 hover:scale-105 min-w-[48px] min-h-[48px]`}
          onClick={() => handleShare(platform.url)}
        >
          {platform.icon}
        </Button>
      ))}
    </div>
  );
};
