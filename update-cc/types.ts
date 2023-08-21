export type ConventionCollective = {
  name: string;
  num: number;
  exampleSiret?: string;
};

export type IdccInfo = {
  num: number;
  name: string;
  link: string;
};

export type DilaResponse = {
  executionTime: number;
  id: string;
  titre: string;
  numeroTexte: string;
  num: string;
  nature: string;
  categorisation: string[];
  activitePro: string[];
  sections: {
    executionTime: number;
    dereferenced: boolean;
    id?: string;
    cid?: string;
    intOrdre: number;
    etat: string;
    title: string;
    dateModif: any;
    dateDebut: any;
    dateFin: any;
    sectionConsultee: boolean;
    sections: any[];
    articles: any[];
    commentaire: any;
    renvoi: any;
    renvoiNum: any;
    notaHtml: any;
    notaSectionsAafficher: any;
  }[];
  descriptionFusionHtml: any;
  texteBaseId: string[];
};

export type KaliInfo = {
  type: "convention collective";
  data: {
    num: number;
    title: string;
    id: string;
    shortTitle: string;
    categorisation: Array<string>;
  };
  children: [];
};

export type Diff = {
  ccManquante: ConventionCollective[];
  ccEnTrop: ConventionCollective[];
};
