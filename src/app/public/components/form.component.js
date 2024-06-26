import { HTML } from '@brtmvdl/frontend'
import { ParagraphGroupComponent } from './paragraph.group.component.js'
import { ButtonComponent } from './button.component.js'

export class FormComponent extends HTML {
  state = { id: 0 }

  children = {
    form: new HTML(),
    paragraphs: [
      new ParagraphGroupComponent(this),
    ],
  }

  constructor(id) {
    super()
    this.state.id = id
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyles()
    this.append(this.getForm())
    this.updateForm()
  }

  setEvents() {
    this.on('add', ({ value: ix }) => this.onAdd(ix))
    this.on('remove', ({ value: ix }) => this.onRemove(ix))
    this.on('moveup', ({ value: ix }) => this.onMoveUp(ix))
    this.on('movedown', ({ value: ix }) => this.onMoveDown(ix))
  }

  onAdd(index) {
    this.children.paragraphs.push(new ParagraphGroupComponent(this))
    this.updateForm()
  }

  onRemove(index) {
    this.children.paragraphs = Array.from(this.children.paragraphs).filter((_, ix) => ix != index)
    this.updateForm()
  }

  onMoveUp(index) {
    if (index > 0) {
      const p1 = this.children.paragraphs[index - 1]
      const p2 = this.children.paragraphs[index]
      this.children.paragraphs[index - 1] = p2
      this.children.paragraphs[index] = p1
    } else {
      console.log('it can not move up')
    }
    this.updateForm()
  }

  onMoveDown(index) {
    if (index < this.children.paragraphs.length - 1) {
      const p1 = this.children.paragraphs[index + 1]
      const p2 = this.children.paragraphs[index]
      this.children.paragraphs[index + 1] = p2
      this.children.paragraphs[index] = p1
    } else {
      console.log('it can not move down')
    }
    this.updateForm()
  }

  setStyles() {
    this.setStyle('padding', 'calc(1rem / 4)')
  }

  getForm() {
    const html = new HTML()
    html.append(this.children.form)
    html.append(this.getSaveButton())
    return html
  }

  getSaveButton() {
    const button = new ButtonComponent()
    button.setText('save')
    button.on('click', () => this.onSaveButtonClick())
    return button
  }

  onSaveButtonClick() {
    this.updateForm()
  }

  updateForm() {
    this.children.form.clear()
    this.children.paragraphs.map((p, ix) => this.children.form.append(p.setIndex(ix)))
    this.dispatchEvent('save')
  }

}
