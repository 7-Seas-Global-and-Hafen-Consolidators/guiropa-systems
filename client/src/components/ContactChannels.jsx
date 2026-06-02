import { useLanguage } from "../i18n/LanguageContext.jsx";
import { EmailIcon, MailHrIcon, PhoneIcon, WhatsAppIcon } from "./ContactIcons.jsx";

function DiscreetChannel({ href, icon, label, hint, ariaLabel, external, className = "" }) {
  const linkClass = `discreet-channel ${className}`.trim();
  const props = {
    href,
    className: linkClass,
    "aria-label": ariaLabel,
  };
  if (external) {
    props.target = "_blank";
    props.rel = "noopener noreferrer";
  }

  return (
    <a {...props}>
      <span className="discreet-channel__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="discreet-channel__text">
        <span className="discreet-channel__label">{label}</span>
        {hint ? <span className="discreet-channel__hint">{hint}</span> : null}
      </span>
    </a>
  );
}

export function CommercialChannels({ layout = "chips", className = "" }) {
  const { t } = useLanguage();
  const c = t.contact;
  const whatsappHref = `https://wa.me/${t.whatsapp.number}?text=${encodeURIComponent(t.footer.whatsappMessage)}`;

  return (
    <ul className={`discreet-channels discreet-channels--${layout} ${className}`.trim()} role="list">
      <li>
        <DiscreetChannel
          href={`mailto:${t.email}`}
          icon={<EmailIcon />}
          label={c.emailLabel}
          hint={c.channelHintEmail}
          ariaLabel={`${c.emailLabel}: ${t.email}`}
        />
      </li>
      <li>
        <DiscreetChannel
          href={whatsappHref}
          icon={<WhatsAppIcon />}
          label={c.whatsappLabel}
          hint={c.channelHintWhatsapp}
          ariaLabel={`${c.whatsappLabel}: ${t.whatsapp.display}`}
          external
          className="discreet-channel--wa"
        />
      </li>
      {t.phones.map((ph, i) => (
        <li key={ph.tel}>
          <DiscreetChannel
            href={`tel:${ph.tel}`}
            icon={<PhoneIcon />}
            label={`${c.phoneLabel}${t.phones.length > 1 ? ` ${i + 1}` : ""}`}
            hint={c.channelHintPhone}
            ariaLabel={`${c.phoneLabel}: ${ph.display}`}
          />
        </li>
      ))}
    </ul>
  );
}

export function HrChannels({ layout = "chips", className = "" }) {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <ul className={`discreet-channels discreet-channels--${layout} ${className}`.trim()} role="list">
      <li>
        <DiscreetChannel
          href={`mailto:${t.hr.sevenSeas}`}
          icon={<MailHrIcon />}
          label="7 SEAS GLOBAL"
          hint={c.channelHintEmail}
          ariaLabel={`7 SEAS GLOBAL — ${t.hr.sevenSeas}`}
        />
      </li>
      <li>
        <DiscreetChannel
          href={`mailto:${t.hr.guiropa}`}
          icon={<MailHrIcon />}
          label="GUIROPA SYSTEMS"
          hint={c.channelHintEmail}
          ariaLabel={`GUIROPA SYSTEMS — ${t.hr.guiropa}`}
        />
      </li>
    </ul>
  );
}
