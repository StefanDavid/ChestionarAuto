import { FootnoteReferenceRun } from "../../file/footnotes/footnote/run/reference-run";
import { IXmlableObject, XmlComponent } from "../../file/xml-components";
import { File } from "../file";
import { AlignmentType } from "./formatting/alignment";
import { IBorderOptions } from "./formatting/border";
import { IIndentAttributesProperties } from "./formatting/indent";
import { PageBreak } from "./formatting/page-break";
import { ISpacingProperties } from "./formatting/spacing";
import { HeadingLevel } from "./formatting/style";
import { LeaderType, TabStopPosition, TabStopType } from "./formatting/tab-stop";
import { Bookmark, HyperlinkRef } from "./links";
import { PictureRun, Run, SequentialIdentifier, SymbolRun, TextRun } from "./run";
export interface IParagraphOptions {
    readonly text?: string;
    readonly border?: IBorderOptions;
    readonly spacing?: ISpacingProperties;
    readonly outlineLevel?: number;
    readonly alignment?: AlignmentType;
    readonly heading?: HeadingLevel;
    readonly bidirectional?: boolean;
    readonly thematicBreak?: boolean;
    readonly pageBreakBefore?: boolean;
    readonly contextualSpacing?: boolean;
    readonly indent?: IIndentAttributesProperties;
    readonly keepLines?: boolean;
    readonly keepNext?: boolean;
    readonly tabStops?: Array<{
        readonly position: number | TabStopPosition;
        readonly type: TabStopType;
        readonly leader?: LeaderType;
    }>;
    readonly style?: string;
    readonly bullet?: {
        readonly level: number;
    };
    readonly numbering?: {
        readonly reference: string;
        readonly level: number;
        readonly custom?: boolean;
    };
    readonly children?: Array<TextRun | PictureRun | SymbolRun | Bookmark | PageBreak | SequentialIdentifier | FootnoteReferenceRun | HyperlinkRef>;
}
export declare class Paragraph extends XmlComponent {
    private readonly properties;
    constructor(options: string | PictureRun | IParagraphOptions);
    prepForXml(file: File): IXmlableObject | undefined;
    addRunToFront(run: Run): Paragraph;
}
