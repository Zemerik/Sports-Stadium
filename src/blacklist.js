const db = require('quick.db');


/**
 * Enables or disables the blacklist word system for a guild
 * @param {Discord.Guild} guild - The guild to enable or disable the system for
 * @param {boolean} isEnabled - Whether the system should be enabled or disabled
 */
function setBlacklistEnabled(guild, isEnabled) {
  db.set(`blacklistedWordsOn_${guild.id}`, isEnabled);
}

/**
 * Adds a new blacklisted word to a guild's list of blacklisted words
 * @param {Discord.Guild} guild - The guild to add the blacklisted word to
 * @param {string} word - The word to add to the blacklist
 */
function addBlacklistedWord(guild, word) {
  const blacklistedWords = db.get(`blacklistedWords_${guild.id}`) || [];
  if (!blacklistedWords.includes(word)) {
    blacklistedWords.push(word);
    db.set(`blacklistedWords_${guild.id}`, blacklistedWords);
  }
}

/**
 * Removes a blacklisted word from a guild's list of blacklisted words
 * @param {Discord.Guild} guild - The guild to remove the blacklisted word from
 * @param {string} word - The word to remove from the blacklist
 */
function removeBlacklistedWord(guild, word) {
  const blacklistedWords = db.get(`blacklistedWords_${guild.id}`) || [];
  const index = blacklistedWords.indexOf(word);
  if (index !== -1) {
    blacklistedWords.splice(index, 1);
    db.set(`blacklistedWords_${guild.id}`, blacklistedWords);
  }
}
//test

const getBlacklistEnabled = (guild) => {
  return db.get(`blacklistedWordsOn_${guild.id}`);
};
/**
 * Returns whether the blacklist word system is enabled for a guild
 * @param {Discord.Guild} guild - The guild to check
 * @returns {boolean} Whether the blacklist word system is enabled or not
 */
function isBlacklistEnabled(guild) {
  return db.get(`blacklistedWordsOn_${guild.id}`) || false;
}

/**
 * Gets a list of the currently blacklisted words for a guild
 * @param {Discord.Guild} guild - The guild to get the list for
 * @returns {string[]} A list of the blacklisted words
 */
function getBlacklistedWords(guild) {
  return db.get(`blacklistedWords_${guild.id}`) || [];
}

/**
 * Clears the list of blacklisted words for a guild
 * @param {Discord.Guild} guild - The guild to clear the list for
 */
function clearBlacklistedWords(guild) {
  db.delete(`blacklistedWords_${guild.id}`);
}

module.exports = {
  setBlacklistEnabled,
  addBlacklistedWord,
  removeBlacklistedWord,
  isBlacklistEnabled,
  getBlacklistedWords,
  clearBlacklistedWords,
  getBlacklistEnabled,
}; 
