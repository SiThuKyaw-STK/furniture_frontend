import Dompurify from "dompurify";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}
const RichTextRenderer = ({ content, className }: Props) => {
  const sanitizedContent = Dompurify.sanitize(content);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className={className}
    />
  );
};

export default RichTextRenderer;
