(function() {
  define([], function() {
    "use strict";
    var i18n;
    i18n = function(text, langNumOrFormatting, numOrFormattingOrContext, formattingOrContext, context) {
      var formatting, lang, num;
      if (context == null) {
        context = self.globalContext;
      }
      if (typeof langNumOrFormatting == "object") {
        lang = null;
        num = null;
        formatting = langNumOrFormatting;
        context = numOrFormattingOrContext || self.globalContext;
      } else {
        if (typeof langNumOrFormatting === "number") {
          lang = null;
          num = langNumOrFormatting;
          formatting = numOrFormattingOrContext;
          context = formattingOrContext || self.globalContext;
        } else {
          lang = langNumOrFormatting;
          if (typeof numOrFormattingOrContext === "number") {
            num = numOrFormattingOrContext;
            formatting = formattingOrContext;
            context = context;
          } else {
            num = null;
            formatting = numOrFormattingOrContext;
            context = formattingOrContext || self.globalContext;
          }
        }
      }
      if (typeof text == "object") {
        if (typeof text['i18n'] == "object") {
          text = text['i18n'];
        }
        return i18n.translateHash(text, context, lang);
      } else {
        return i18n.translate(text, num, formatting, context, lang);
      }
    };

    i18n.globalContext = null;

    i18n.data = null;

    i18n.languageData = null;

    self = i18n

    i18n.add = function(d, lang) {
      var c, data, k, v, _i, _len, _ref, _ref1, _results;
      if (lang != null) {
        if (i18n.languageData[lang] == null) {
          i18n.languageData[lang] = {
            values: {},
            contexts: []
          };
        }
        data = i18n.languageData[lang];
      } else {
        data = i18n.data;
      }
      if ((d.values != null)) {
        _ref = d.values;
        for (k in _ref) {
          v = _ref[k];
          data.values[k] = v;
        }
      }
      if ((d.contexts != null)) {
        _ref1 = d.contexts;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          _results.push(data.contexts.push(c));
        }
        return _results;
      }
    };

    i18n.setContext = function(key, value) {
      return i18n.globalContext[key] = value;
    };

    i18n.clearContext = function(key) {
      return i18n.globalContext[key] = null;
    };

    i18n.reset = function() {
      i18n.data = {
        values: {},
        contexts: []
      };
      i18n.globalContext = {};
      return i18n.languageData = {};
    };

    i18n.resetData = function() {
      i18n.data = {
        values: {},
        contexts: []
      };
      return i18n.languageData = {};
    };

    i18n.resetContext = function() {
      return i18n.globalContext = {};
    };

    i18n.resetLanguage = function(lang) {
      return i18n.languageData[lang] = null;
    };

    i18n.translateHash = function(hash, context, language) {
      var k, v;
      for (k in hash) {
        v = hash[k];
        if (typeof v === "string") {
          hash[k] = i18n.translate(v, null, null, context, language);
        }
      }
      return hash;
    };

    i18n.translate = function(text, num, formatting, context, language) {
      var contextData, data, result;
      if (context == null) {
        context = self.globalContext;
      }
      if (language != null) {
        data = i18n.languageData[language];
      }
      if (data == null) {
        data = i18n.data;
      }
      if (data == null) {
        return i18n.useOriginalText(text, num, formatting);
      }
      contextData = i18n.getContextData(data, context);
      if (contextData != null) {
        result = i18n.findTranslation(text, num, formatting, contextData.values);
      }
      if (result == null) {
        result = i18n.findTranslation(text, num, formatting, data.values);
      }
      if (result == null) {
        return i18n.useOriginalText(text, num, formatting);
      }
      return result;
    };

    i18n.findTranslation = function(text, num, formatting, data) {
      var result, triple, value, _i, _len;
      value = data[text];
      if (value == null) {
        return null;
      }
      if (num == null) {
        if (typeof value === "string") {
          return i18n.applyFormatting(value, num, formatting);
        }
      } else {
        if (value instanceof Array || value.length) {
          for (_i = 0, _len = value.length; _i < _len; _i++) {
            triple = value[_i];
            if ((num >= triple[0] || triple[0] === null) && (num <= triple[1] || triple[1] === null)) {
              result = i18n.applyFormatting(triple[2].replace("-%n", String(-num)), num, formatting);
              return i18n.applyFormatting(result.replace("%n", String(num)), num, formatting);
            }
          }
        }
      }
      return null;
    };

    i18n.getContextData = function(data, context) {
      var c, equal, key, value, _i, _len, _ref, _ref1;
      if (data.contexts == null) {
        return null;
      }
      _ref = data.contexts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        equal = true;
        _ref1 = c.matches;
        for (key in _ref1) {
          value = _ref1[key];
          equal = equal && value === context[key];
        }
        if (equal) {
          return c;
        }
      }
      return null;
    };

    i18n.useOriginalText = function(text, num, formatting) {
      if (num == null) {
        return i18n.applyFormatting(text, num, formatting);
      }
      return i18n.applyFormatting(text.replace("%n", String(num)), num, formatting);
    };

    i18n.applyFormatting = function(text, num, formatting) {
      var ind, regex;
      for (ind in formatting) {
        regex = new RegExp("%{" + ind + "}", "g");
        text = text.replace(regex, formatting[ind]);
      }
      return text;
    };

    i18n.reset();

    return i18n

  });
}).call(self);