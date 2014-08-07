class Editor extends View
  @content: (params) ->
    @div class: "pane", =>
      @div class: "document", =>
        @textarea class: "editor", keydown: 'update', outlet: "text"
      @div class: "document", =>
        @subview 'hinter', new Hinter
        @subview 'common_words', new CommonWords
        @subview 'dash', new Dash

  initialize: (params) ->

  update: (args) ->
    content = @text.val()
    @dash.update(content)
    if 190 <= args.keyCode <= 191 # "." or "?"
      @hinter.shuffle()
      @common_words.update(content)

class Hinter extends View
  @content: (params) ->
    @div class: 'hinter', =>
      @ol outlet: "hints"

  initialize: (params) ->
    @shuffle()

  shuffle: () ->
    possible = ["run", "walk", "hike", "eat", "drink", "laugh", "door", "color", "hill", "sky", "field", "land", "basement", "what's up?", "how's it going?", "red", "blue", "deserted", "empty", "wind-swept", "tree"]
    @hints.html("")
    for el in _.sample(possible, 10)
      @hints.append("<li>#{el}</li>")

class Dash extends View
  @content: (params) ->
    @div class: 'dash', =>
      @b "Paragraphs:"
      @span outlet: "paras", 0
      @b "Words:"
      @span outlet: "words", 0
      @b "Characters:"
      @span outlet: "chars", 0

  update: (text) ->
    console.log text
    count_c = text.length
    @chars.html(count_c)
    count_w = text.split(" ").length
    @words.html(count_w)
    count_p = text.split("\n").length
    @paras.html(count_p)

class CommonWords extends View
  @content: (params) ->
    @div class:"common_words", =>
      @ol outlet:"words"

  initialize: (params) ->
    @empty = "<li>no repeated words</li>"
    @words.html(@empty)

  update: (text) ->
    @words.html(@empty)
    to_lc = (t.toLowerCase() for t in text.split(" "))
    counts = {}
    groups = _.filter(_.map(_.groupBy(to_lc, (l)->l), (v,k) -> [k,v.length]), ([w,n]) -> n > 1)
    best = _.first(_.sortBy(groups, ([k,n]) -> n*-1), 10)
    if best.length >= 1
      @words.html("")
      for [word,n] in best
        @words.append("<li><b>#{word}:</b><span>#{n}</span></li>")


$('document').ready ->
  $('body').append(new Editor)
