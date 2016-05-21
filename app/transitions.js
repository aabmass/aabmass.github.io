export default function () {
  this.transition(
    this.fromRoute('index'),
    this.toRoute('blog.index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );
}
