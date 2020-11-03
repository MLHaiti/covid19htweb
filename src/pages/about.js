import React from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Layout } from "components";
import { Box, Heading, Link } from "@chakra-ui/core";

const Page = () => (
  <>
    <Head>
      <title>Kiyes nou ye?</title>
    </Head>
    <Layout>
      <Heading as="h3" size="md" marginTop="8" marginBottom="2">
        Context général
      </Heading>
      <Box as="p" fontSize="lg" lineHeight="tall">
        Ce site est un effort de groupes de jeunes voulant contribuer dans ce
        combat que nous devons mener ensemble pour vaincre cette pandémie de
        corona virus qui se trouve déjà dans nos villes.
      </Box>

      <Heading as="h3" size="md" marginTop="8" marginBottom="2">
        À court terme
      </Heading>
      <Box as="p" fontSize="lg" lineHeight="tall">
        À court terme notre objectif est d'avoir premièrement une source
        d'information. Nous espérons également pouvoir permettre à nos
        utilisateurs de poser des questions qui seront répondues par une équipe
        de medecins volontaires.
        <br /> <br />
        La première ligne de défense contre cette pandémie est de combattre
        toutes ces rumeurs et recettes qui pleuvent chaque jour à nous n'en plus
        finir.
        <br /> <br />
        Si toutes les personnes qui ont un smartphone savent qu'elles peuvent
        trouver de l'information fiable, nous sommes convaincus qu'elles
        n'hésiteront pas à s'informer et informer leurs proches
      </Box>

      <Heading as="h3" size="md" marginTop="8" marginBottom="2">
        Sur le long terme
      </Heading>
      <Box as="p" fontSize="lg">
        Sur le long terme nous espérons que ce site sera la référence en matière
        d'information fiable et traitant de sujets qui préoccupent la santé de
        la population de manière beaucoup pro-active et préventive
      </Box>

      <Box marginTop="8" as="p">
        Vous aimeriez contribuer?{" "}
        <NextLink href="/contribute" passHref>
          <Link>Cliquez-ici</Link>
        </NextLink>
      </Box>
    </Layout>
  </>
);

export default Page;
