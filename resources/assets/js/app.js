var matrixtyping = (function($) {

  var messages = {
    'm1': {
      text: 'Hey there!',
      next: 'm2'
    },
    'm2': {
      text: 'Do you need help to develop your website?!',
      next: 'end'
    }
  };

  var config = {
    targetNode: "matrixtyping",
    cursor: "<span class=\"blink\">_</span>",
    typingSpeed: 100,
    deletingSpeed: 30,
    typingDelay: 300,
    deletingDelay: 1000
  };

  var typingSurface;
  var typingState;

  function typing() {

    var text = messages[typingState.messageId].text;
    var thisChar = text.substr(typingState.charIndex, 1);
    typingSurface.innerHTML = text.substr(0, typingState.charIndex++) + config.cursor;

    if (thisChar == '<') {
      typingState.isInTag = true;
    }
    if (thisChar == '>') {
      typingState.isInTag = false;
    }

    if (typingState.charIndex < text.length + 1) {
      if (typingState.isInTag) {
        typing();
      } else {
        setTimeout(function() {
          typing();
        }, config.typingSpeed);
      }
    } else {
      if (messages[typingState.messageId].next !== 'end') {
        setTimeout(function() {
          deleting();
        }, config.deletingDelay);
      }
    }
  }

  function deleting() {

    var text = messages[typingState.messageId].text;
    var thisChar = text.substr(typingState.charIndex - 1, 1);
    typingSurface.innerHTML = text.substr(0, typingState.charIndex--) + config.cursor;

    if (thisChar == '<') {
      typingState.isInTag = false;
    }
    if (thisChar == '>') {
      typingState.isInTag = true;
    }

    if (typingState.charIndex >= 0) {
      if (typingState.isInTag) {
        deleting();
      } else {
        setTimeout(function() {
          deleting();
        }, config.deletingSpeed);
      }
    } else {
      typingState.messageId = messages[typingState.messageId].next;

      setTimeout(function() {
        typing();
      }, config.typingDelay);
    }
  }

  return {
    start: function() {

      typingState = {
        messageId: 'm1',
        charIndex: 0,
        isInTag: false
      };

      typingSurface = document.getElementById(config.targetNode);
      typingSurface.innerHTML = config.cursor;

      setTimeout(function() {
        typing();
      }, config.typingDelay);
    },
  };
})(jQuery);