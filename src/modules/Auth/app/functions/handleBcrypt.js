const bcrypt = require('bcryptjs')

const encrypt = async (strPasswordPlain) => {
    const hash = await bcrypt.hash(strPasswordPlain, 10)
    return hash
}
 
const compare = async (strPasswordPlain, strPasswordHash) => {
    return await bcrypt.compare(strPasswordPlain, strPasswordHash)
}

module.exports = {encrypt, compare}