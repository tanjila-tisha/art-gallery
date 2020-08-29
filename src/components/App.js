import React, { useState, useEffect } from "react";
import ArtCard from "./ArtCard";
import { repositoryURL, identifiers, projection } from "../config";
import "../stylesheets/build/index.css";

const App = () => {
  const [artList, setArtList] = useState([]);

  const getArtList = async () => {
    /*global EntryStore*/ // To disable any eslint 'EntryStore not defined' errors
    const es = new EntryStore.EntryStore(repositoryURL);
    const artEntries = await es
      .newSolrQuery()
      .rdfType(identifiers.pieceOfArt)
      .list()
      .getEntries();

    const list = await artEntries.map(async (artEntry) => {
      const artistResourceURI = artEntry
        .getMetadata()
        .findFirstValue(artEntry.getResourceURI(), projection.artist);
      const artistEntryURI = es.getEntryURIFromURI(artistResourceURI);
      const artistEntry = await es.getEntry(artistEntryURI);
      const artistName = artistEntry
        .getMetadata()
        .findFirstValue(artistEntry.getResourceURI(), projection.givenName);
      const artistFamilyName = artistEntry
        .getMetadata()
        .findFirstValue(artistEntry.getResourceURI(), projection.familyName);
      return {
        title: artEntry
          .getMetadata()
          .findFirstValue(artEntry.getResourceURI(), projection.title),
        description: artEntry
          .getMetadata()
          .findFirstValue(artEntry.getResourceURI(), projection.description),
        imgSrc: artEntry
          .getMetadata()
          .findFirstValue(artEntry.getResourceURI(), projection.imgSrc),
        artist: `${artistName}  ${artistFamilyName}`,
      };
    });

    setArtList(await Promise.all(list));
  };
  useEffect(() => {
    getArtList();
  }, []);

  if (artList.length === 0) {
    return <div className="card__container"> Loading... </div>;
  }

  const items = artList.map((pieceOfArt) => {
    return <ArtCard pieceOfArt={pieceOfArt} key={pieceOfArt.title} />;
  });

  return (
    <div>
      <div className="header">
        <h1>Art Gallery</h1>
      </div>
      <div className="card__container">{items}</div>
    </div>
  );
};
export default App;
