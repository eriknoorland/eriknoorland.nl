export interface HomepageProps {
  readonly data: {
    readonly data: {
      readonly title: {
        readonly text: string | null;
      };
      readonly subtitle: {
        readonly text: string | null;
      };
    };
  } | null;
};

export interface AboutpageProps {
  readonly data: {
    readonly data: {
      readonly title: {
        readonly text: string | null;
      };
      readonly body: {
        readonly html: string | null;
      };
      readonly image: {
        readonly alt: string | null;
        readonly url: string | null;
        readonly dimensions: {
          readonly width: number;
          readonly height: number;
        } | null;
      } | null;
    };
  } | null;
};

export interface ContactpageProps {
  readonly data: {
    readonly data: {
      readonly title: {
        readonly text: string | null;
      };
      readonly body: {
        readonly html: string | null;
      };
    };
  } | null;
};

export interface ProjectTag {
  tag: string;
};

export interface Project {
  title: {
    text: string;
    html: string;
  };
  description: {
    text: string;
  };
  image: {
    alt: string;
    url: string;
    dimensions: {
      width: number;
      height: number;
    };
  };
  video: {
    url: string;
  };
  category: string;
  tags: ProjectTag[];
  link?: {
    url: string;
  }
};