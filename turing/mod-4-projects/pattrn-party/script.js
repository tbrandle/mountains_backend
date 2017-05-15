$('.tab').on('click', (e) => {
  const nextContentId = $(e.target).attr('name')
  const previousContentId = $('.tabs-section').children('.selected-tab').attr('name')
  $('.tabs-section').children('.selected-tab').removeClass('selected-tab')
  $(e.target).addClass('selected-tab')

  $(`#${previousContentId}`).attr('hidden', true)
  $(`#${nextContentId}`).removeAttr('hidden')
})





$('.view-source').on('click', () => {
  if (!$('body').children().hasClass('cp_embed_wrapper')) {
    $('body').append(`
      <p data-height="464" data-theme-id="0" data-slug-hash="zwaaKo" data-default-tab="html" data-user="tbrandle" data-embed-version="2" data-pen-title="PattrnParty" class="codepen">See the Pen <a href="https://codepen.io/tbrandle/pen/zwaaKo/">PattrnParty</a> by Tim Brandle (<a href="http://codepen.io/tbrandle">@tbrandle</a>) on <a href="http://codepen.io">CodePen</a>.</p>
      <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
      `)
  } else if($('.cp_embed_wrapper').attr('hidden')) {
    $('.cp_embed_wrapper').removeAttr('hidden', 'hidden')
  } else {
    $('.cp_embed_wrapper').attr('hidden', 'hidden')
  }
})
