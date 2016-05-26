import Ember from 'ember';

export default Ember.Mixin.create({
  /** This is a mixin to be mixed with a component! */

  didUpdate() {
    renderMathInElement(this.get('element'), {
      delimiters: [
        {
          left: "$$",
          right: "$$",
          display: true
        },
        {
          left: "\\[", right: "\\]",
          display: true
        },
        {
          left: "\\(", right: "\\)",
          display: false
        },
        /* also parse $ ... $ as inline latex */
        {
          left: "$",
          right: "$",
          display: false
        }
      ]
    });
  }
});
