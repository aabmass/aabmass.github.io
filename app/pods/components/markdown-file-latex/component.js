// import Ember from 'ember';
import ParseForLatexComponentMixin from 'aabmass-github-io/mixins/parse-for-latex-component-mixin';
import MarkdownFileComponent from 'ui-markdown/components/markdown-file';

export default MarkdownFileComponent.extend(ParseForLatexComponentMixin, {
  // use the template from the parent component
  layoutName: 'ui-markdown/components/markdown-file'
});
