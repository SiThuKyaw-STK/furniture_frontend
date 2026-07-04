import { Link } from "react-router";
import { Icons } from "../icons";
import { siteConfig } from "@/config/site";
import { EmailForm } from "@/components/new-letter";

const Footer = () => {
  return (
    <footer className="w-full border-t px-4 xl:px-0">
      <div className="container mx-auto pb-8 pt-6 lg:py-6">
        <section className="flex flex-col xl:flex-row xl:justify-between gap-10">
          <section>
            <Link to="/" className="flex items-center space-x-2">
              <Icons.logo className="size-6" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </section>
          <section className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 gap-10">
            {siteConfig.footerNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-2 text-sm">
                <h4 className="font-semibold">{item.title}</h4>
                {item.items.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.href}
                    target={subItem.external ? "_blank" : "_self"}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            ))}
          </section>
          <section className="flex flex-col space-y-2">
            <h4 className="font-semibold text-sm">Subscribe to our newsletter</h4>
            <EmailForm />
          </section>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
