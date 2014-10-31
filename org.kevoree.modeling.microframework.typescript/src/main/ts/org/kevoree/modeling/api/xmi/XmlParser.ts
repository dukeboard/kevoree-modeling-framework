///<reference path="../../../../../java/util/ArrayList.ts"/>

class XmlParser {

  private payload: number[] = null;
  private current: number = 0;
  private currentChar: string = null;
  private tagName: string = null;
  private tagPrefix: string = null;
  private attributePrefix: string = null;
  private readSingleton: boolean = false;
  private attributesNames: ArrayList<string> = new ArrayList<string>();
  private attributesPrefixes: ArrayList<string> = new ArrayList<string>();
  private attributesValues: ArrayList<string> = new ArrayList<string>();
  private attributeName: StringBuilder = new StringBuilder();
  private attributeValue: StringBuilder = new StringBuilder();

  constructor(str: string) {
    this.payload = str.getBytes();
    this.currentChar = this.readChar();
  }

  public getTagPrefix(): string {
    return this.tagPrefix;
  }

  public hasNext(): boolean {
    this.read_lessThan();
    return this.current < this.payload.length;
  }

  public getLocalName(): string {
    return this.tagName;
  }

  public getAttributeCount(): number {
    return this.attributesNames.size();
  }

  public getAttributeLocalName(i: number): string {
    return this.attributesNames.get(i);
  }

  public getAttributePrefix(i: number): string {
    return this.attributesPrefixes.get(i);
  }

  public getAttributeValue(i: number): string {
    return this.attributesValues.get(i);
  }

  private readChar(): string {
    if (this.current < this.payload.length) {
      var re: number = this.payload[this.current];
      this.current++;
      return <string>re;
    }
    return '\0';
  }

  public next(): XmlToken {
    if (this.readSingleton) {
      this.readSingleton = false;
      return XmlToken.END_TAG;
    }
    if (!this.hasNext()) {
      return XmlToken.END_DOCUMENT;
    }
    this.attributesNames.clear();
    this.attributesPrefixes.clear();
    this.attributesValues.clear();
    this.read_lessThan();
    this.currentChar = this.readChar();
    if (this.currentChar == '?') {
      this.currentChar = this.readChar();
      this.read_xmlHeader();
      return XmlToken.XML_HEADER;
    } else {
      if (this.currentChar == '!') {
        do {
          this.currentChar = this.readChar();
        } while (this.currentChar != '>')
        return XmlToken.COMMENT;
      } else {
        if (this.currentChar == '/') {
          this.currentChar = this.readChar();
          this.read_closingTag();
          return XmlToken.END_TAG;
        } else {
          this.read_openTag();
          if (this.currentChar == '/') {
            this.read_upperThan();
            this.readSingleton = true;
          }
          return XmlToken.START_TAG;
        }
      }
    }
  }

  private read_lessThan(): void {
    while (this.currentChar != '<' && this.currentChar != '\0'){
      this.currentChar = this.readChar();
    }
  }

  private read_upperThan(): void {
    while (this.currentChar != '>'){
      this.currentChar = this.readChar();
    }
  }

  private read_xmlHeader(): void {
    this.read_tagName();
    this.read_attributes();
    this.read_upperThan();
  }

  private read_closingTag(): void {
    this.read_tagName();
    this.read_upperThan();
  }

  private read_openTag(): void {
    this.read_tagName();
    if (this.currentChar != '>' && this.currentChar != '/') {
      this.read_attributes();
    }
  }

  private read_tagName(): void {
    this.tagName = "" + this.currentChar;
    this.tagPrefix = null;
    this.currentChar = this.readChar();
    while (this.currentChar != ' ' && this.currentChar != '>' && this.currentChar != '/'){
      if (this.currentChar == ':') {
        this.tagPrefix = this.tagName;
        this.tagName = "";
      } else {
        this.tagName += this.currentChar;
      }
      this.currentChar = this.readChar();
    }
  }

  private read_attributes(): void {
    var end_of_tag: boolean = false;
    while (this.currentChar == ' '){
      this.currentChar = this.readChar();
    }
    while (!end_of_tag){
      while (this.currentChar != '='){
        if (this.currentChar == ':') {
          this.attributePrefix = this.attributeName.toString();
          this.attributeName = new StringBuilder();
        } else {
          this.attributeName.append(this.currentChar);
        }
        this.currentChar = this.readChar();
      }
      do {
        this.currentChar = this.readChar();
      } while (this.currentChar != '"')
      this.currentChar = this.readChar();
      while (this.currentChar != '"'){
        this.attributeValue.append(this.currentChar);
        this.currentChar = this.readChar();
      }
      this.attributesNames.add(this.attributeName.toString());
      this.attributesPrefixes.add(this.attributePrefix);
      this.attributesValues.add(this.attributeValue.toString());
      this.attributeName = new StringBuilder();
      this.attributePrefix = null;
      this.attributeValue = new StringBuilder();
      do {
        this.currentChar = this.readChar();
        if (this.currentChar == '?' || this.currentChar == '/' || this.currentChar == '-' || this.currentChar == '>') {
          end_of_tag = true;
        }
      } while (!end_of_tag && this.currentChar == ' ')
    }
  }

}

