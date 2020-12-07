const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#characterMessage").animate({width:'toggle'}, 350);
};

const redirect = (response) => {
    $("#characterMessage").animate({width:'hide'}, 350);
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
    return $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};

// Assumes your document using is `pt` units
// If you're using any other unit (mm, px, etc.) use this gist to translate: https://gist.github.com/AnalyzePlatypus/55d806caa739ba6c2b27ede752fa3c9c
function addWrappedText({text, textWidth, doc, fontSize = 10, fontType = 'normal', lineSpacing = 7, xPosition = 10, initialYPosition = 10, pageWrapInitialYPosition = 10}) {
    doc.setFontType(fontType);
    doc.setFontSize(fontSize);
    var textLines = doc.splitTextToSize(text, textWidth); // Split the text into lines
    var pageHeight = doc.internal.pageSize.height;        // Get page height, we'll use this for auto-paging. TRANSLATE this line if using units other than `pt`
    var cursorY = initialYPosition;
  
    textLines.forEach(lineText => {
      if (cursorY > pageHeight) { // Auto-paging
        doc.addPage();
        cursorY = pageWrapInitialYPosition;
      }
      doc.text(xPosition, cursorY, lineText);
      cursorY += lineSpacing;
    })
  }

  // gets race ability bonuses given the D&D 5e API race object
const getDND_Race_AB = (raceAPI, ability) => {
    let bonus = 0;
    raceAPI.ability_bonuses.forEach(ab => {
        if(ab.ability_score.index === ability) bonus = ab.bonus;
    });

    return bonus;
};

// saves rolls and sum of n number of d-sided dice
const rollDice = (n, d) => {
    const _rolls = [];
    for (let i = 0; i < n; i++) {
      const roll = Math.floor(Math.random() * d + 1);
      _rolls.push(roll);
    }

    const _sum = _rolls.reduce((a, b) => a + b, 0);

    const results = { rolls: _rolls, sum: _sum };

    return results;
  };

  // follow algorithm for determining ability score
  const rollForAbilityScore = () => {
    const results = rollDice(4, 6);
    let _sum = results.sum;
    _sum -= Math.min(...results.rolls);
    return _sum;
  };
