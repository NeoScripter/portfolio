import { cn } from '@/lib/helpers/utils';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef, useState } from 'preact/hooks';
import 'remixicon/fonts/remixicon.css';
import { Markdown } from 'tiptap-markdown';

type MarkdownEditorProps = {
    value: string;
    onChange: (value: string) => void;
    className?: string;
};

export default function MarkdownEditor({
    className,
    value,
    onChange,
}: MarkdownEditorProps) {
    const [labels, setLabels] = useState<boolean[]>([]);
    const isExternalUpdate = useRef(false);

    const editor = useEditor({
        extensions: [StarterKit, Markdown],
        editorProps: {
            attributes: {
                class: 'prose prose-md leading-7! [&>p>strong,h2,h3,h4]:text-foreground! [&>blockquote,a]:text-foreground! min-h-40 max-w-full outline-none transition-[color,box-shadow] text-foreground! bg-background selection:bg-foreground selection:text-background placeholder:text-gray-500 disabled:opacity-50',
            },
        },
        content: value,
        onTransaction: ({ editor }) => {
            const markdown = editor.storage.markdown.getMarkdown();

            if (!isExternalUpdate.current) {
                onChange(markdown);
            }

            setLabels(getActiveStates(editor));
        },
    });

    useEffect(() => {
        if (editor && value !== editor.storage.markdown.getMarkdown()) {
            isExternalUpdate.current = true;
            editor.commands.setContent(value);
            setTimeout(() => {
                isExternalUpdate.current = false;
            }, 50);
        }
    }, [editor, value]);

    if (!editor) return null;

    return (
        <div
            className={cn(
                'focus-within:border-ring border-input focus-within:ring-accent/80 bg-background rounded-lg border px-3 py-2 text-base shadow-xs focus-within:ring-[1px]',
                className,
            )}
        >
            <menu className="bg-background sticky top-15 z-10 mb-8 flex flex-wrap items-center gap-1 rounded-md p-2 shadow-md sm:top-25 md:top-30">
                {markdownBtns.map((btn, i) => (
                    <MarkdownBtn
                        key={btn.title}
                        editor={editor}
                        title={btn.title}
                        icon={btn.icon}
                        onClick={() => btn.onClick(editor)}
                        isActive={labels[i]}
                    />
                ))}
            </menu>
            <EditorContent editor={editor} />
        </div>
    );
}

type MarkdownBtnProps = {
    title: string;
    icon: string;
    onClick: (editor: Editor) => void;
    isActive?: boolean;
    editor: Editor;
};

function MarkdownBtn({
    title,
    icon,
    onClick,
    isActive,
    editor,
}: MarkdownBtnProps) {
    return (
        <li>
            <button
                type="button"
                title={title}
                onClick={() => onClick(editor)}
                className={cn(
                    'hover:bg-accent-foreground/30 cursor-pointer rounded p-2 transition-colors',
                    isActive && 'bg-accent-foreground text-background',
                )}
            >
                <i className={icon} />
            </button>
        </li>
    );
}

type MarkdownButton = {
    title: string;
    icon: string;
    onClick: (editor: Editor) => void;
};

const markdownBtns: MarkdownButton[] = [
    {
        title: 'Bold',
        icon: 'ri-bold',
        onClick: (e) => e.chain().focus().toggleBold().run(),
    },
    {
        title: 'Italic',
        icon: 'ri-italic',
        onClick: (e) => e.chain().focus().toggleItalic().run(),
    },
    {
        title: 'Strike',
        icon: 'ri-strikethrough',
        onClick: (e) => e.chain().focus().toggleStrike().run(),
    },
    {
        title: 'Blockquote',
        icon: 'ri-double-quotes-l',
        onClick: (e) => e.chain().focus().toggleBlockquote().run(),
    },
    {
        title: 'Link',
        icon: 'ri-link',
        onClick: (e) => {
            const href = prompt('Enter URL') || '';
            e.chain().focus().setLink({ href }).run();
        },
    },
    {
        title: 'Ordered list',
        icon: 'ri-list-ordered',
        onClick: (e) => e.chain().focus().toggleOrderedList().run(),
    },
    {
        title: 'Unordered list',
        icon: 'ri-list-unordered',
        onClick: (e) => e.chain().focus().toggleBulletList().run(),
    },
    {
        title: 'Heading 1',
        icon: 'ri-h-1',
        onClick: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
        title: 'Heading 2',
        icon: 'ri-h-2',
        onClick: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
        title: 'Heading 3',
        icon: 'ri-h-3',
        onClick: (e) => e.chain().focus().toggleHeading({ level: 4 }).run(),
    },
];

function getActiveStates(editor: Editor): boolean[] {
    return [
        editor.isActive('bold'),
        editor.isActive('italic'),
        editor.isActive('strike'),
        editor.isActive('blockquote'),
        editor.isActive('link'),
        editor.isActive('orderedList'),
        editor.isActive('bulletList'),
        editor.isActive('heading', { level: 2 }),
        editor.isActive('heading', { level: 3 }),
        editor.isActive('heading', { level: 4 }),
    ];
}
