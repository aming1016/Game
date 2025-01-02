class GachaGame {
    constructor() {
        this.cards = {
            'SSR': ['超级英雄A', '超级英雄B', '超级英雄C'],
            'SR': ['英雄D', '英雄E', '英雄F', '英雄G'],
            'R': ['普通角色H', '普通角色I', '普通角色J', '普通角色K', '普通角色L']
        };
        
        this.probabilities = {
            'SSR': 0.03,
            'SR': 0.17,
            'R': 0.80
        };
        
        this.gems = 1000;
    }

    drawCard() {
        const rand = Math.random();
        let rarity;
        
        if (rand < this.probabilities.SSR) {
            rarity = 'SSR';
        } else if (rand < this.probabilities.SSR + this.probabilities.SR) {
            rarity = 'SR';
        } else {
            rarity = 'R';
        }
        
        const card = this.cards[rarity][Math.floor(Math.random() * this.cards[rarity].length)];
        return { rarity, card };
    }
}

const game = new GachaGame();
const gemsDisplay = document.getElementById('gems');
const cardDisplay = document.getElementById('cardDisplay');
const history = document.getElementById('history');

function updateGems() {
    gemsDisplay.textContent = game.gems;
}

function createCardElement(cardInfo) {
    const cardDiv = document.createElement('div');
    cardDiv.className = `card ${cardInfo.rarity}`;
    cardDiv.innerHTML = `
        <h3>${cardInfo.rarity}</h3>
        <p>${cardInfo.card}</p>
    `;
    return cardDiv;
}

function addToHistory(message) {
    const historyEntry = document.createElement('p');
    historyEntry.textContent = message;
    history.insertBefore(historyEntry, history.firstChild);
}

function drawOnce() {
    if (game.gems < 100) {
        alert('钻石不足！');
        return;
    }
    
    game.gems -= 100;
    updateGems();
    
    cardDisplay.innerHTML = '';
    const cardInfo = game.drawCard();
    cardDisplay.appendChild(createCardElement(cardInfo));
    
    addToHistory(`单抽获得: ${cardInfo.rarity} ${cardInfo.card}`);
}

function drawTen() {
    if (game.gems < 1000) {
        alert('钻石不足！');
        return;
    }
    
    game.gems -= 1000;
    updateGems();
    
    cardDisplay.innerHTML = '';
    let results = [];
    let hasHighRarity = false;
    
    // 抽9张卡
    for (let i = 0; i < 9; i++) {
        const cardInfo = game.drawCard();
        if (cardInfo.rarity === 'SR' || cardInfo.rarity === 'SSR') {
            hasHighRarity = true;
        }
        results.push(cardInfo);
    }
    
    // 第10张卡保底
    if (!hasHighRarity) {
        let cardInfo;
        do {
            cardInfo = game.drawCard();
        } while (cardInfo.rarity === 'R');
        results.push(cardInfo);
    } else {
        results.push(game.drawCard());
    }
    
    results.forEach(cardInfo => {
        cardDisplay.appendChild(createCardElement(cardInfo));
    });
    
    addToHistory(`十连抽完成！`);
} 