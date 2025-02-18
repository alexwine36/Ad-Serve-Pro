import { Copy } from 'lucide-react';
import Prism from 'prismjs';
import { useCopyToClipboard } from '../../../hooks/use-copy-to-clipboard';
import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import { Text } from '../typography';
import './index.css';

type CodePreviewProps = {
  code: string;
  allowCopy?: boolean;
};

export const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  allowCopy = true,
}) => {
  const [copiedText, copy] = useCopyToClipboard();

  return (
    <div className="relative rounded bg-muted/20 p-4">
      {allowCopy && (
        <span className="absolute top-0 right-0 flex items-center">
          <Text
            size={'sm'}
            variant="muted"
            data-state={copiedText === code ? 'open' : 'closed'}
            className={cn(
              'mr-3 opacity-0 transition-opacity',
              'data-[state=open]:animate-fade-in-out'
            )}
          >
            Copied...
          </Text>
          <Button
            onClick={() => {
              copy(code);
            }}
            variant="outline"
            size="icon"
            className="z-10"
            // className="absolute top-0 right-0"
            //   className="relative top-0 right-0"
          >
            <Copy />
          </Button>
        </span>
      )}

      <pre className="relative px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm">
        <code
          // biome-ignore lint/security/noDangerouslySetInnerHtml: needed for code highlight
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(code, Prism.languages.html, 'html'),
          }}
        />
      </pre>
    </div>
  );
};
