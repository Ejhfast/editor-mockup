class Editor extends View
  @content: (params) ->
    @div class: "document", =>
      @textarea class: "editor", keydown: 'update', outlet: "text"
      @subview 'hinter', new Hinter

  initialize: (params) ->
    @text = params.text

  update: (args) ->
    if args.keyCode is 190 # "."
      @hinter.shuffle()

class Hinter extends View
  @content: (params) ->
    @div class: 'hinter', =>
      @ol outlet: "hints"

  initialize: (params) ->
    @shuffle()

  shuffle: () ->
    possible = ["run", "walk", "hike", "eat", "drink", "laugh", "door", "color", "hill", "sky", "field", "land", "basement", "what's up?", "how's it going?", "red", "blue", "deserted", "empty", "wind-swept", "tree"]
    @hints.html("<b>Hints:</b>")
    for el in _.sample(possible, 10)
      @hints.append("<li>#{el}</li>")

$('document').ready ->
  $('body').append(new Editor(text: "Hello World!"))
