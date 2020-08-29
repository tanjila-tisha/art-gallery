const repositoryURL = "https://recruit.entryscape.net/store";
const identifiers = {
  pieceOfArt: "http://example.com/PieceOfArt",
  artist: "http://example.com/Artist",
};
const projection ={
    title: "http://purl.org/dc/terms/title",
    description: "http://purl.org/dc/terms/description",
    imgSrc: "http://xmlns.com/foaf/0.1/img",
    artist: "http://example.com/artist",
    givenName: "http://xmlns.com/foaf/0.1/givenName",
    familyName: "http://xmlns.com/foaf/0.1/familyName",
   };

export {repositoryURL, identifiers, projection};