export interface IHomepageProps {
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

export interface IAboutpageProps {
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

export interface IContactpageProps {
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

export interface IProjectTag {
  tag: string;
};

export interface IProject {
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
  tags: IProjectTag[];
  link?: {
    url: string;
  }
};