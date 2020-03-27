import React from "react";
import Head from "next/head";
import { Layout } from "components";

import { Box, Heading, Link } from "@chakra-ui/core";

export default () => (
  <>
    <Head>
      <title>Kontribye</title>
    </Head>
    <Layout>
      <Heading as="h1" size="lg" marginTop="8" marginBottom="2">
        Comment contribuer ?
      </Heading>
      <Box as="p" fontSize="lg" lineHeight="tall">
        La première chose que nous pouvons tous faire est de nous informer et
        mettre en pratique les consignes pour faire face à cette crise.
        <br />
        <br />
        Quand vous trouvez un article ou un conseil utile sur ce site
        partagez-le avec vos proches. À noter que nos ne faisons pas de
        publicités sur ce site, et nous ne vendons rien d'aucune sorte.
        <br />
        <br />
        Beaucoup de personnes sont des incrédules par rapport à la maladie mais
        par notre comportement nous pouvons leur faire ressentir l'urgence de
        l'heure
      </Box>

      <Heading as="h3" size="md" marginTop="8" marginBottom="2">
        Vous êtes médecins ?
      </Heading>
      <Box as="p" fontSize="lg" lineHeight="tall">
        Nous recherchons des articles de qualité. Nos allons commencé par
        traduire des informations générales de source comme le (CDC - WHO
        mythes, conseils, etc.) en créole. Ces informations seront
        principalement sur la pandémie
        <br />
        Nous allons dans quelques sous peu la possibilité pour de créer un
        compte et de pouvoir écrire des articles. Et nous aimerions avoir des
        conseils ciblés prenant en compte le quotidient de la population.
        <br />À noter que nous ne voulons pas inonder les lecteurs avec des
        dizaines particles par jour.
      </Box>

      <Heading as="h3" size="md" marginTop="8" marginBottom="2">
        Développeurs ?
      </Heading>
      <Box as="p" fontSize="lg" lineHeight="tall">
        Le projet est en open source sur Github, aidez-nous à améliorer le
        service.
      </Box>
    </Layout>
  </>
);
