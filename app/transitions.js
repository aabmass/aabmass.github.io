export default function () {
  var defaultUseArgs = ['fade', {duration: 250}];

  this.transition(
    this.fromRoute('index'),
    this.toRoute('blog'),
    this.useAndReverse(...defaultUseArgs)
  );

  this.transition(
    this.fromRoute('blog.index'),
    this.toRoute('blog.post'),
    this.useAndReverse(...defaultUseArgs)
  );
}
