import { Github } from "lucide-react";

const FooterCustom = () => {
  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BibleApp
            </p>
            <a
              href="https://github.com/Alex200207"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-2 text-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">Alex Talavera</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCustom;
