const normalizeIdcc = num => num && `0000${num}`.slice(-4);

export default normalizeIdcc;
