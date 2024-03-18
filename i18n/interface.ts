export default interface i18nDictionaries {
  auth: {
    login: string;
    signup: string;
    logout: string;
    emailAddress: string;
    password: string;
    form: {
      intro: {
        login: string;
        signup: string;
      };
      note: {
        noTempEmailAddr: string;
        notRECSamePassword: string;
      };
      switch: {
        toLogin: string;
        toSignup: string;
      };
      invalid: {
        emailAddress: string;
        password: string;
      };
      requirements: {
        includeNumber: string;
        includeLowercaseAlphabet: string;
        includeUppercaseAlphabet: string;
        includeSymbol: string;
        moreThan10Characters: string;
      }
    };
  };
  init: {
    form: {
      title: string;
      intro: string;
    }
  };
  settings: {
    settings: string;
    language: string;
  };
  error: {
    page: {
      apologize: string;
      noDescription: string;
    }
  };
}
