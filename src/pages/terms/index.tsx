import cn from 'classnames';

import type { NextPageWithLayout } from '@/types';

import Link from 'next/link';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useEffect, useState } from 'react';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';

import { ConnectButton } from '@paperxyz/embedded-wallet-service-rainbowkit';
//import { renderPaperCheckoutLink } from '@paperxyz/js-client-sdk';

//import { useAccount } from 'wagmi';

//import RootLayout from './layout';

import RootLayout from '@/layouts/_root-layout';

import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import NFTCard from '@/components/nft/NFTCard';

//import '@rainbow-me/rainbowkit/styles.css';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { PaperEmbeddedWalletProvider } from '@paperxyz/embedded-wallet-service-rainbowkit';

import {
  ConnectWallet,
  useDisconnect,
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
  Web3Button,
} from '@thirdweb-dev/react';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  tokenContractAddressGRD,
} from '../../config/contractAddresses';

export type BlogPost = {
  title: string;
  description: string;
};

const dummyPosts: BlogPost[] = [
  {
    title: 'Lorem Ipsum Dolor Sit Amet',
    description:
      'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Vestibulum Ante Ipsum Primis',
    description:
      'Faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel.',
  },
  {
    title: 'Mauris Blandit Aliquet Elit',
    description:
      'Etiam erat velit, scelerisque in dictum non, consectetur eget mi. Vestibulum ante ipsum primis in faucibus.',
  },
  {
    title: 'Cras Ultricies Ligula Sed',
    description:
      'Pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
];

/* ======================================
              Main Component
======================================= */
///const HomePage = () => {

const MintPage: NextPageWithLayout = () => {
  const { layout } = useLayout();

  const address = useAddress();

  const { contract: nftDropContract } = useContract(
    nftDropContractAddressHorse,
    'nft-drop'
  );

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  console.log('owenedNfts', ownedNfts);

  const [loading, setLoading] = useState(true);
  const [hasNFT, setHasNFT] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Thirdweb Stuff
  //const sdk = new ThirdwebSDK('mumbai');

  //const sdk = new ThirdwebSDK('goerli');

  const sdk = new ThirdwebSDK('polygon');

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
  const shareableLink = process.env.NEXT_PUBLIC_SHAREABLE_LINK!;
  const minimumBalance = 1;
  const erc1155TokenId = 0;

  /*
  const { address, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      console.log('Connected');
    },
    onDisconnect() {
      console.log('Disconnected');
      setPosts([]);
      setHasNFT(false);
    },
  });
  

  useEffect(() => {
    const checkNFT = async () => {
      const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await contract.erc1155.balanceOf(
          address,
          erc1155TokenId
        );
        // const balance = await contract.erc721.balanceOf(address);
        const isValid = balance.gte(minimumBalance);

        if (isValid) {
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          setHasNFT(true);
        } else {
          setPosts([]);
          setHasNFT(false);
        }
      }
    };

    checkNFT();
  }, [address]);

  // Fixes Hydration Issues
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return null;
  */

  return (
    <div className="text-left leading-loose">
      <div>
        <b>MOMOCON SG PTE. LTD.</b>
        <br />
        <b>GRANDERBY Terms of Service</b>

        <ol>
          <li>
            These Terms of Service (<b>Terms</b>) form a contract between
            MOMOCON SG PTE. LTD. (UEN 202304445H) and the GRANDERBY user (
            <b>Users, you</b>), which you must accept to use any part of
            GRANDERBY.
          </li>
          <li>
            GRANDERBY is a distributed application that runs on the Ethereum
            network, using uniquely developed smart contracts (
            <b>Smart Contracts</b>) to enable users to purchase, sell, breed and
            race statistically unique digital thoroughbreds, which can then be
            visualized on a website that the user can interact and earn Ethereum
            from GRANDERBY (<b>GRANDERBY</b>).
          </li>
          <li>
            PLEASE READ THESE TERMS CAREFULLY BEFORE USING GRANDERBY, THE SMART
            CONTRACTS, OR THE WEBSITE. THESE TERMS GOVERN YOUR USE OF THE
            WEBSITE, THE SMART CONTRACTS, AND THE WEBSITE, UNLESS WE HAVE
            EXECUTED A SEPARATE WRITTEN AGREEMENT WITH YOU FOR THAT PURPOSE. WE
            ARE ONLY WILLING TO MAKE GRANDERBY, THE SMART CONTRACTS, AND THE
            WEBSITE AVAILABLE TO YOU IF YOU ACCEPT ALL OF THESE TERMS. BY USING
            GRANDERBY, THE SMART CONTRACTS, THE WEBSITE, OR ANY PART OF THEM, OR
            PURCHASING AN NON-FUNGIBLE TOKEN (NFT), YOU ARE CONFIRMING THAT YOU
            UNDERSTAND AND AGREE TO BE BOUND BY ALL OF THESE TERMS, INCLUDING
            ANY AMENDED TERMS. IF YOU ARE ACCEPTING THESE TERMS ON BEHALF OF A
            COMPANY OR OTHER LEGAL ENTITY, YOU REPRESENT THAT YOU HAVE THE LEGAL
            AUTHORITY TO ACCEPT THESE TERMS ON THAT ENTITY’S BEHALF, IN WHICH
            CASE “YOU” WILL MEAN THAT ENTITY. IF YOU DO NOT HAVE SUCH AUTHORITY,
            OR IF YOU DO NOT ACCEPT ALL OF THESE TERMS, THEN WE ARE UNWILLING TO
            MAKE GRANDERBY, THE SMART CONTRACTS, THE WEBSITE, OR AN NFT,
            AVAILABLE TO YOU. IF YOU DO NOT AGREE TO THESE TERMS, YOU MAY NOT
            ACCESS OR USE GRANDERBY, THE SMART CONTRACTS, OR THE WEBSITE.
          </li>
          <br />
          <b>USING GRANDERBY</b>
          <li>
            Restrictions
            <ol type="a">
              <li>
                {' '}
                GRANDERBY is only available to users over the age of 18. You
                must not create an account if you are under the age of 18.
              </li>
              <li>
                {' '}
                You must not, under any circumstances:
                <ol type="i">
                  <li>
                    use exploits, automation software, bots, mods, or any
                    unauthorised third-party software designed to modify or
                    interfere with the GRANDERBY service, any GRANDERBY game,
                    any GRANDERBY smart contract, any GRANDERBY NFT, or any
                    GRANDERBY game experience or without MOMOCON’s express
                    written consent, modify or cause to be modified any files
                    that are a part of the service or any GRANDERBY platform or
                    game.
                  </li>
                  <li>
                    disrupt, or assist to disrupt, any computer, network or
                    server used to provide the GRANDERBY service or game
                    environment.
                  </li>
                  <li>
                    obtain, or attempt to gain, unauthorised access to the
                    GRANDERBY service or to any account of another GRANDERBY
                    user.
                  </li>
                  <li>
                    breach the GRANDERBY Prohibited Behaviours rules, which can
                    be accessed by following this{' '}
                    <a href="https://granderby.io" target="_blank">
                      link
                    </a>
                    .
                  </li>
                </ol>
              </li>
              <li>
                You agree that you will not use a name for any NFT or user that
                is likely to be offensive, derogatory, prejudicial, inflammatory
                or inappropriate for use in the GRANDERBY community. MOMOCON
                reserves the right upon to cancel the name of any NFT or user
                which MOMOCON determines in its absolute discretion to be
                offensive, derogatory, prejudicial, inflammatory or
                inappropriate for use in the GRANDERBY community by giving the
                NFT owner or user written notice (which may provided after the
                name has been cancelled). Where such a determination is made,
                the NFT name or user name will be changed to a generic name and
                the NFT owner or account registrant will be able to choose a new
                name. You agree that the determination of MOMOCON is final and
                not reviewable, and that repeated breaches of this clause may
                result in suspension of the user’s account or the ability for
                the NFT to participate in GRANDERBY and/or the termination of
                the Licence issued under clause 23.b.
              </li>
              <li>
                We reserve the right to suspend or terminate a User account for
                breach of these Terms of Service by the User or fraudulent,
                harmful, criminal or unfair behaviour of a User, to include:
                <ol type="i">
                  <li>
                    we suspect the User of committing fraud in connection with
                    these Terms;
                  </li>
                  <li>the User engaging in suspicious transactions;</li>
                  <li>
                    if we suspect the User has used, is using, or will use
                    confidential information of MOMOCON in any manner not
                    authorised by MOMOCON.
                  </li>
                  <li>
                    the User does not comply with some or all of these Terms;
                  </li>
                  <li>
                    The User’s account login and password are in the possession
                    of a third party.
                  </li>
                </ol>
              </li>
              <li>
                GRANDERBY is not available in every region. We reserve the right
                to restrict or block access to our services based on the User s
                location.
              </li>
            </ol>
          </li>
          <li>
            GRANDERBY has utilized Smart Contracts to develop the GRANDERBY
            Genesis racehorses. GRANDERBY will release a certain number of
            Genesis racehorses into the marketplace and make them available for
            purchase to the public at the Company’s discretion. GRANDERBY will
            release 38,000 racehorses and will never, ever release any more
            thoroughbreds. As described below, the racehorses may breed
            offspring.
          </li>
          <li>
            <b>
              WHEN PARTICIPANTS COMPETE IN RACES USING THEIR VIRTUAL
              THOROUGHBREDS, THEY ARE UTILIZING SKILL TO CHOOSE THE
              THOROUGHBRED, THE RACE, AND OTHER FACTORS. IN OTHER WORDS, PLAYERS
              ABILITIES DETERMINE THE OUTCOME OF THE SKILLS-BASED COMPETITIONS.
              GAMES OF SKILL ARE PERMITTED IN MOST JURISDICTIONS AND DO NOT
              CONSTITUTE GAMBLING (WHICH GENERALLY REQUIRES A GAME OF CHANCE,
              PRIZE, AND CONSIDERATION TO PLAY). SOME JURISDICTIONS LIMIT GAMES
              OF SKILL WHERE PAYMENTS ARE INVOLVED. IT IS YOUR RESPONSIBILITY TO
              DETERMINE WHETHER THE JURISDICTION IN WHICH YOU ARE LOCATED
              PERMITS SKILL-BASED COMPETITIONS. WHEN YOU PARTICIPATE IN
              COMPETITIONS, THESE TERMS OF SERVICE SHALL APPLY.{' '}
            </b>
          </li>
          <li>
            As users breed their racehorses, new racehorses (offspring)
            GRANDERBY genotypes will be created. Using GRANDERBY’s proprietary
            algorithm, each thoroughbred created from breeding will have a
            unique profile value. Each offspring will carry over certain
            characteristics from its mother (mare) and its father (stallion)
            such as its bloodline, breed type and genotype.{' '}
          </li>
          <li>
            How you breed your thoroughbreds is entirely up to each user. The
            only restrictions that we place are that female (mare/filly) and
            male (stallion/colt) racehorses must mate together. In addition,
            male-to-male racehorses and female-to-female thoroughbreds cannot
            breed together and racehorses cannot breed with brothers, sisters,
            parents or grandparents.
          </li>
          <li>
            The gender outcome of each offspring is generated according to a
            pre-determined sequence and the offspring will always be owned by
            the female racehorse once the breeding transaction is complete.
          </li>
          <li>
            To most easily use GRANDERBY, we strongly recommend that you first
            install the Google Chrome web browser. Once you have installed
            Chrome, you will need to install a browser extension called
            MetaMask. MetaMask is an electronic digital wallet, which allows you
            to purchase, store, and engage in transactions using Ethereum or any
            other ERC-20 cryptocurrency. You will not be able to engage in any
            transactions on GRANDERBY other than through MetaMask (or other
            Ethereum-compatible browsers) or an email address, where GRANDERBY
            creates a non-custodial electronic digital wallet for you.
          </li>
          <li>
            GRANDERBY will only recognize you as a user and you will only be
            able to interact with GRANDERBY, if your Ethereum electronic digital
            wallet is connected and unlocked through your MetaMask account or
            your email address. There is no other way to sign up as a user, or
            to interact directly with GRANDERBY. BY USING OUR SERVICES YOU AGREE
            THAT YOU ARE GOVERNED BY THE TERMS OF SERVICE AND PRIVACY POLICY FOR
            THE APPLICABLE EXTENSIONS. FOR METAMASK, THOSE TERMS ARE AVAILABLE
            AT (https://metamask.io/terms.html) and
            (https://metamask.io/privacy.html).
          </li>
          <li>
            You are responsible for any Internet connection and
            telecommunication fees and charges that you incur when accessing
            GRANDERBY.
          </li>
          <li>
            Transactions that take place on GRANDERBY are managed and confirmed
            via the Polygon blockchain, which is a proof of stake network, and a
            sidechain to the Ethereum blockchain. The main Ethereum blockchain
            is currently a proof of work network. Proof of stake networks use
            less energy than proof of work networks. You understand that your
            Ethereum public address will be made publicly visible whenever you
            engage in a transaction on GRANDERBY.
          </li>
          <li>
            We neither own nor control MetaMask, Google Chrome, the Ethereum
            network, or any other third party site, product, or service that you
            might access, visit, or use for the purpose of enabling you to use
            the various features of GRANDERBY. GRANDERBY will not be liable for
            the acts or omissions of any such third parties, nor will we be
            liable for any damage that you may suffer as a result of your
            transactions or any other interaction with any such third parties.
          </li>
          <li>
            You must provide accurate and complete registration information when
            you create an account on GRANDERBY. By creating an account, you
            agree to provide accurate, current and complete account information
            about yourself, and to maintain and promptly update as necessary
            your account information. You are responsible for the security of
            your account and your MetaMask wallet (and other Ethereum wallets
            and email accounts).
          </li>
          <li>
            You may not share or transfer any account. You may not disclose your
            password or other credentials to anyone. You agree to immediately
            notify GRANDERBY by sending an email to us at hello@zed.run
            concerning any known or suspected unauthorized use(s) of your
            account or any known or suspected breach of security, including
            loss, theft or unauthorized disclosure of your password. You
            understand and agree that you shall be liable for all activities
            that occur under any account created for your use, even if such
            activities were not committed by you. We are not responsible for any
            loss or damage arising from your failure to maintain the
            confidentiality of your password or of your account.
          </li>
          <br />
          <b>FEES</b>
          <li>
            Transactions
            <ol type="a">
              <li>
                If you elect to purchase, sell or breed racehorses using
                GRANDERBY, or with or from other users in GRANDERBY, any
                financial transactions that you engage in will be conducted
                solely through the Ethereum network via MetaMask. We will have
                no insight into or control over these payments or transactions,
                nor do we have the ability to reverse any transactions. With
                that in mind, we will have no liability to you or to any third
                party for any claims or damages that may arise as a result of
                any transactions that you engage in via the App, or using the
                Smart Contracts, or any other transactions that you conduct via
                the Ethereum network or MetaMask.
              </li>
              <li>
                10% of the fee paid for pay-to-enter races will be allocated and
                held for the benefit of other participants of GRANDERBY who win
                prizes, and the GRANDERBY infrastructure. The allocated amount
                will either be paid out as prizes, or be paid as a contribution
                towards the GRANDERBY infrastructure.
              </li>
            </ol>
          </li>
          <li>
            Ethereum requires the payment of a transaction fee (a “Gas Fee”) for
            every transaction that occurs on the Ethereum network. The Gas Fee
            funds the network of computers that run the decentralized Ethereum
            network. This means that you will need to pay a Gas Fee for each
            transaction that occurs via the App.
          </li>
          <li>
            In addition to the Gas Fee, each time you utilize a Smart Contract
            to conduct a transaction with another user via GRANDERBY, you
            authorize GRANDERBY to collect a commission on certain events only
            (a “Commission”). These events include purchasing, selling or
            breeding of a thoroughbred on the App. You acknowledge and agree
            that the Commission will be transferred directly to us through the
            Ethereum network as part of your payment.
          </li>
          <br />
          <b>TERMS OF SALE OF NON-FUNGIBLE TOKENS</b>
          <li>
            When you purchase or Procure non-fungible tokens (<b>NFTs</b>) for
            use in GRANDERBY you must agree to the following terms and
            conditions (<b>NFT Terms</b>), which apply to you and any subsequent
            person to whom you sell the NFT(s) you purchased from us in the
            first instance, or to whom you otherwise transfer the NFT(s) you
            Procured.
          </li>
          <li>
            Applicability of NFT Terms
            <ol type="a">
              <li>
                All NFTs purchased or Procured by you are subject to these NFT
                Terms, unless otherwise agreed in writing and by purchasing, or
                pre-purchasing or Procuring any NFT you are agreeing to be bound
                by these NFT Terms.
              </li>
              <li>
                The use of any NFTs with GRANDERBY is subject to these NFT Terms
                together with any other terms and conditions which may apply to
                the use of GRANDERBY including without limitation our Privacy
                Policy and any ancillary document relating to the Licence
                referred to in clause 23.b.
              </li>
              <li>
                Termination of these NFT Terms for any reason will not affect
                any obligations which have arisen prior to termination.
              </li>
            </ol>
          </li>
          <li>
            Purchasing NFTs
            <ol type="a">
              <li>
                Pre-sales of NFTs.
                <ol type="i">
                  <li>
                    We may conduct pre-sales of NFTs from time to time, either
                    as a stand-alone or with bundles, including for early access
                    or for expansions of GRANDERBY.
                  </li>
                  <li>
                    Orders placed for pre-purchase of NFTs are non-refundable,
                    cannot be cancelled for change of mind, and require payment
                    of the Purchase Price at the time of the pre-purchase.
                  </li>
                  <li>
                    We may require that you register an account with us to
                    pre-purchase an NFT.
                  </li>
                  <li>
                    We may require that you nominate your Digital Wallet at the
                    time of the order, or nominate a Digital Wallet at a later
                    time, for delivery of any pre-purchased NFT.
                  </li>
                  <li>
                    We will undertake reasonable endeavours to deliver any
                    pre-purchased NFTs to your nominated Digital Wallet by any
                    date we provide for delivery. You acknowledge, however, that
                    the delivery date may change for reasons (including for
                    reasons outside or within our control) at our sole
                    discretion.
                  </li>
                </ol>
              </li>
              <li>
                Sales of NFTs
                <ol type="i">
                  <li>
                    We may list NFTs for sale from time to time, which may be
                    stand-alone or as part of a bundle of other digital goods.
                  </li>
                  <li>
                    Orders placed for NFTs are non-refundable, cannot be
                    cancelled for change of mind, require payment in full of the
                    Purchase Price at the time of purchase and may require that
                    you connect or provide a Digital Wallet for delivery of the
                    NFT at the time of sale.
                  </li>
                  <li>
                    If you engage in a secondary sale of your NFT to another
                    purchaser, that transaction may involve third party
                    platforms or Blockchain digital wallets which are not
                    associated with us, and may be subject to transaction fees
                    charged by that network. Should any transfer be conducted
                    using a marketplace we provide, then fees and charges may
                    apply to those transactions payable to us at the time of the
                    transaction.
                  </li>
                </ol>
              </li>
              <li>
                Pre-conditions to sale
                <ol type="i">
                  <li>
                    You must make payment in full in any nominated Digital
                    Currency or via any other nominated payment method as a
                    pre-condition to any purchase of an NFT.
                  </li>
                  <li>
                    In the case of a primary sale, we will have no obligation to
                    transfer any NFT to you until we have received the Purchase
                    Price in full for any NFT. If you make payment to our
                    Digital Wallet, you must ensure your transfer is made to the
                    correct wallet address.
                  </li>
                  <li>
                    In the event that any payment is reversed or becomes
                    invalid, including via either a double spend attack or
                    recall or refund request by a payment processor, you agree
                    to immediately return to us any NFTs the subject of a sale
                    where the Purchase Price has no longer been retained in full
                    by us.
                  </li>
                </ol>
              </li>
              <li>
                Title and Risk
                <ol type="i">
                  <li>
                    Risk and title in any NFT purchase transfers to you upon
                    purchase of the NFT and you are responsible for ensuring
                    your Digital Wallet is accurately linked. If you lose your
                    private key or login or seed phrase for your Digital Wallet
                    you will lose access to your NFTs stored in your Digital
                    Wallet.
                  </li>
                </ol>
              </li>
              <li>
                Refunds - Risk in value of Digital Currency
                <ol type="i">
                  <li>
                    Where the Purchase Price has been paid in a Digital Currency
                    and you are entitled to a refund for any reason, you agree
                    the refund is to be made in the same form of Digital
                    Currency used in the initial transaction, or at our option
                    in Australian dollars equivalent to the value of the Digital
                    Currency used in the initial transaction on the date the
                    Purchase Price was paid.
                  </li>
                </ol>
              </li>
              <li>
                Gameplay
                <ol type="i">
                  <li>
                    NFTs purchased or Procured by you may be used for gameplay
                    in GRANDERBY, which may provide additional features and
                    services.
                  </li>
                  <li>
                    Gameplay in GRANDERBY may be subject to further
                    instructions, restrictions, terms and conditions as detailed
                    in these Terms, GRANDERBY or on the Website, including in
                    respect of our stud and breeding programs and racing game.
                  </li>
                  <li>
                    We do not represent or guarantee that your access to
                    GRANDERBY will be uninterrupted or will be maintained into
                    the future.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            Intellectual Property Licence in NFTs
            <ol type="a">
              <li>
                We grant, to the party who Owns an NFT we have issued for the
                time that party Owns the NFT (Term), a licence in respect of the
                Art associated with the NFT purchase subject always to these NFT
                Terms in force at the date of sale or transfer together with any
                other terms and conditions which may apply to the NFT.
              </li>
              <li>
                The Licence is assignable, transferable and revocable on the
                terms of these NFT Terms, and is for your personal,
                non-commercial, royalty free use of the NFT (including to sell
                or transfer on a Marketplace) and to display and enjoy the Art
                associated with the NFT anywhere in the world (<b>Licence</b>).
              </li>
              <li>
                Upon your sale of the NFT you Own, the Licence transfers to the
                purchaser who then Owns the NFT and will be subject to the
                Licence and these NFT Terms. For the avoidance of doubt, the
                transfer of the Licence does not constitute a commercial use for
                the purposes of clause b.
              </li>
              <li>
                With immediate effect upon your sale of the NFT you Own, your
                rights under the Licence pursuant to clause b shall cease to
                apply and will no longer be in force and effect. You will no
                longer be entitled to use the Art (or any reproductions of the
                Art) upon sale by you of the NFT.
              </li>
              <li>
                Except as expressly stated in these NFT Terms, nothing in these
                NFT Terms are intended to, or shall operate to, give you
                ownership of any Intellectual Property Rights in, or other
                rights in respect of the Intellectual Property.
              </li>
              <li>
                There is no transfer of title or ownership of any Intellectual
                Property or any Intellectual Property rights upon the sale of
                the NFT under these NFT Terms.
              </li>
              <li>
                The NFT may not be used in any way which would:
                <ol type="i">
                  <li>modify any Art; or</li>
                  <li>
                    use the Art to market or to sell third-party products or for
                    any other commercial benefit; or
                  </li>
                  <li>
                    use the Art in connection with images of hatred, violence or
                    other inappropriate behaviour be reasonably considered to
                    bring the Intellectual Property Rights owner into disrepute;
                    or
                  </li>
                  <li>
                    seek to trademark or acquire Intellectual Property Rights in
                    the Art; or
                  </li>
                  <li>
                    take, appropriate or represent any ownership in the
                    Intellectual Property; or
                  </li>
                  <li>
                    assert any right to or over the Intellectual Property in any
                    manner inconsistent with the rights under these NFT Terms;
                    or
                  </li>
                  <li>
                    take any action which would or might invalidate, challenge,
                    oppose or otherwise put in dispute the owner’s title to the
                    Intellectual Property; or be reasonably seen to disparage
                    the Intellectual Property Rights of the owner; or
                  </li>
                  <li>
                    contravene the moral rights of the artist or licensor of the
                    Art; or
                  </li>
                  <li>contravene the Website Terms or these NFT Terms; or</li>
                  <li>
                    cause, permit or assist any other person directly or
                    indirectly to do any of the above acts.
                  </li>
                </ol>
              </li>
              <li>
                For the avoidance of any doubt:
                <ol type="i">
                  <li>
                    the restrictions on the Licence survive termination or
                    assignment transfer of the Licence; and
                  </li>
                  <li>
                    the purchase of an NFT does not grant you any ownership or
                    licence for any Intellectual Property Rights over GRANDERBY
                    or any aspect of Art used in our NFTs other than as
                    expressly set out in these NFT Terms; and
                  </li>
                  <li>
                    the Licence granted under this clause is limited to the time
                    you Own the NFT and upon your sale of the NFT to another
                    party the Licence is assigned to the purchaser of the NFT
                    and your rights under the Licence cease to have any effect,
                    and you must draw to the other party’s attention the
                    contents of these NFT Terms prior to your sale of the NFT;
                  </li>
                  <li>
                    the sale of your NFT does not constitute a “commercial use”
                    of your NFT for the purposes of these NFT Terms.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            Termination
            <ol type="a">
              <li>Termination with cause.</li>
              <li>
                These NFT Terms and the Licence may be terminated with immediate
                effect:
                <ol type="i">
                  <li>
                    by us if any of the warranties in clause 26 are breached; or
                  </li>
                  <li>
                    by us if the limitations of the Licence in clause 23.g are
                    breached; or
                  </li>
                  <li>
                    by either party if the other party commits any material
                    breach of its obligations under these Terms and fails to
                    remedy such breach (if capable of remedy) within 30 days of
                    receipt of notice from the non-defaulting party requiring it
                    to do so.
                  </li>
                </ol>
              </li>
              <li>
                Termination of these Terms does not affect the rights of the
                parties which have accrued prior to termination.
              </li>
            </ol>
          </li>
          <li>
            <b>Acknowledgements</b>
            <br />
            You acknowledge and agree that:
            <ol type="a">
              <li>
                we provide NFTs solely on a proprietary basis for use with
                GRANDERBY and if we transact with you we do so solely on a
                bilateral basis;
              </li>
              <li>
                NFTs are not intended for speculative use, are not sold or
                represented to be financial product and nothing we publish is in
                any way financial advice to you or any other person;
              </li>
              <li>
                NFTs may experience or may have extreme price volatility,
                including being worthless in the future;
              </li>
              <li>
                we are not providing and will not provide any fiduciary,
                advisory, brokerage, exchange or other similar services to you
                or any other person;
              </li>
              <li>
                you are solely responsible for any decision to enter into a
                transaction subject to these NFT Terms, including the evaluation
                of any and all risks related to any such transaction;
              </li>
              <li>
                a significant degree of IT sophistication is required to safely
                deal in and store NFTs of any kind using a Digital Wallet;
              </li>
              <li>
                we are not a custodian for the purposes of the Corporations Act,
                and transfers of any NFTs are for transaction purposes only;
              </li>
              <li>
                all transactions entered into and conducted under these Terms
                are deemed to have occurred within the jurisdiction of New South
                Wales, Australia;
              </li>
              <li>
                we are not responsible for any Loss caused by your failure to
                act in accordance with our policies, procedures or in accordance
                with our reasonable directions;
                <ol>
                  <li>
                    you purchase NFTs entirely at your own risk and
                    understanding and we have not made any representations or
                    warranties as to the IT security or ongoing availability of
                    such NFTs or that your access to use your NFTs in GRANDERBY
                    or in any other way will be uninterrupted, timely or secure
                    at all times;
                  </li>
                </ol>
              </li>
              <li>
                you understand and acknowledge that your ownership of NFTs
                remains contingent upon you remaining in control of the seed
                phrases and private key(s) associated with your Digital Wallet
                and that we will not store any information in connection with
                your Digital Wallet beyond that required for the sale of NFTs or
                the interaction of your Digital Wallet with GRANDERBY;
              </li>
              <li>
                we do not and cannot guarantee there will be any use for, or any
                particular price available for any NFT you purchase from us; and
              </li>
              <li>
                we do not represent or guarantee any outcomes, or any financial
                return from your acquisition of any NFT from us, save the
                ability to use the NFT within GRANDERBY for such time as we
                choose to support on and off GRANDERBY, and such access to
                GRANDERBY may be subject to further terms and conditions,
                including payment of subscription fees.
              </li>
            </ol>
          </li>

          <li>
            Warranties
            <ol type="a">
              <li>
                Our Warranties
                <br />
                We represent and warrant that:
                <ol type="i">
                  <li>
                    We own, or have the right to use under licence, the
                    Intellectual Property Rights in the NFTs which we sell and
                    are legally entitled to, and are capable of, selling the
                    NFTs offered for sale;
                  </li>
                  <li>
                    We will give you notice before we discontinue or alter the
                    rights or features of any NFTs which you have purchased,
                    subject to any other terms and conditions applying to
                    GRANDERBY; and
                  </li>
                  <li>
                    We will undertake reasonable efforts to deliver any
                    pre-purchased NFTs within the planned time indicated for
                    delivery.
                  </li>
                </ol>
              </li>
              <li>
                Purchaser warranties
                <br />
                You warrant and assure us that in acquiring an NFT (from us or
                from a third party or existing NFT holder):
                <ol type="i">
                  <li>
                    You are sufficiently experienced and educated to make
                    decisions regarding the procurement or purchase of NFTs from
                    us, including sufficient experience in dealing with and
                    storing NFTs using a Digital Wallet;
                  </li>
                  <li>
                    You have all necessary experience, resources, certificates,
                    licences, permits and approvals to procure or purchase of
                    NFTs applicable in Your Jurisdiction, and that any
                    transactions under these NFT Terms or in your use of
                    GRANDERBY will be legal under the applicable laws of Your
                    Jurisdiction;
                  </li>
                  <li>
                    All information you supply to us is true and accurate as at
                    the time it is given, and that any Digital Wallet address
                    you provide to us has been generated in accordance with best
                    practice security measures and no other party, other than
                    you or your authorised representative, has used, or has
                    access to, the seed phrases, private keys or analogous
                    passwords required to effect transfers from, the Digital
                    Wallet;
                  </li>
                  <li>
                    As far as you are aware, there are no facts, circumstances
                    or other information which both:
                    <ol type="i">
                      <li>
                        you have not fully and fairly disclosed to us in a
                        manner and to an extent that it would impact out ability
                        to make a reasonable assessment of those facts, matters
                        and circumstances prior to entering into a transaction
                        to sell you an NFT; and
                      </li>
                      <li>
                        is of such nature and materiality that a reasonable
                        person, had it been made aware of, could not reasonably
                        be expected to consider prior to entering into a
                        transaction for the sale of NFTs;
                      </li>
                    </ol>
                  </li>
                  <li>
                    You are not involved in any capacity in any claim, legal
                    action, proceeding, suit, litigation, prosecution,
                    investigation, enquiry, mediation or arbitration (nor which
                    are pending or threatened) concerning NFTs;
                  </li>
                  <li>
                    If we request, you will identify and substantiate the source
                    of funds involved in transactions to acquire NFTs;
                  </li>
                  <li>
                    No Digital Currency transferred to us as part of a Purchase
                    Price has been derived from any illegal or unlawful
                    activity;
                  </li>
                  <li>
                    You are the lawful owner of any Digital Wallet nominated for
                    delivery of NFTs and each Digital Wallet is owned and
                    operated solely for your benefit, and no person has any
                    right, title or interest in your nominated Digital Wallet;
                    and
                  </li>
                  <li>
                    You have had the opportunity to obtain independent legal
                    advice in relation to the terms and effect of these Terms.
                  </li>
                  <li>You have not suffered an Insolvency Event.</li>
                </ol>
              </li>
            </ol>
          </li>

          <li>
            Continuous warranties
            <br />
            You represent and warrant to us that each of the Purchaser
            Warranties in clause 26.b is true and accurate, and not misleading
            or deceptive as at the date of these NFT Terms and, except as
            expressly stated, will be true, accurate and not misleading or
            deceptive each time an NFT or NFTs are provided to you.
          </li>
          <li>
            Notification
            <br />
            You must disclose to us anything that has or will constitute a
            material breach of a Purchaser’s Warranty or cause a Purchaser’s
            Warranty to be untrue or inaccurate, as soon as practicable after
            you become aware of it.
          </li>
          <li>
            Mutual warranties
            <br />
            Each party warrants and assures the other party that:
            <ol type="a">
              <li>
                if it is a company, it is duly incorporated and validly exists
                under the law of its place of incorporation; and
              </li>
              <li>
                these terms constitute a legal, valid and binding terms
                enforceable in accordance with its terms by appropriate legal
                remedy.
              </li>
            </ol>
          </li>
          <li>
            Consumer Guarantees
            <ol type="a">
              <li>
                Certain legislation, including the Australian Consumer Law (
                <b>ACL</b>) contained in the Competition and Consumer Act 2010
                (Cth and similar consumer protection laws and regulations, may
                provide you with rights, warranties, guarantees and remedies
                relating to your purchase of NFTs which cannot be excluded,
                restricted or modified in these NFT Terms (
                <b>Statutory Rights</b>).
              </li>
              <li>
                Nothing in these NFT Terms does, or is intended to, exclude any
                Statutory Rights which you are entitled to.
              </li>
            </ol>
          </li>
          <li>
            Knowledge and awareness
            <br />
            Where a warranty is given ‘to the best of a party’s knowledge,
            belief and awareness’, or ‘as far as the party is aware’ or with a
            similar qualification as to the relevant party’s awareness or
            knowledge, the party giving the warranty will be deemed to know or
            be aware of a particular fact, matter or circumstance if that
            party’s directors or senior management employees are aware of that
            fact, matter or circumstance, or would have become aware if they had
            made reasonable enquiries as at the date of these NFT Terms.
          </li>
          <li>
            Indemnity
            <ol type="a">
              <li>
                You hereby indemnify us and our Personnel and will keep us and
                our Personnel indemnified at all times to the fullest extent
                permitted by law in respect of any Loss or Claim which we or our
                Personnel may suffer, sustain or incur arising from, or
                connected with, a breach of a Purchaser Warranty without
                limitation.
              </li>
              <li>
                In addition, you must indemnify us and our Personnel and keep us
                and our Personnel indemnified at all times to the fullest extent
                permitted by law in respect of any Claim which we or our
                Personnel may suffer, sustain or incur arising from, or
                connected with, any breach of these NFT Terms, other than a
                breach of a Purchaser Warranty, or any breach of all applicable
                laws, reduced to the extent of the Loss in respect of the Claim
                was caused by the negligent act or omission of us or our
                Personnel.
              </li>
            </ol>
          </li>
          <li>
            Limitation of liability
            <ol type="a">
              <li>
                Limitation of liability
                <ol type="i">
                  <li>
                    In the absence of a material breach of these NFT Terms by us
                    or the gross negligence, fraud or wilful misconduct by us
                    when providing NFTs to you under these NFT Terms, we will
                    not be liable to you on account of anything done, omitted or
                    suffered by us acting in good faith when providing NFTs to
                    you pursuant to these NFT Terms, including in respect of a
                    Force Majeure Event.
                  </li>
                </ol>
              </li>
              <li>
                Third party services
                <ol type="i">
                  <li>
                    Subject to clause 36.a.i., we will not be liable for the
                    performance, errors or omissions of unaffiliated, nationally
                    or regionally recognised third parties or decentralised
                    networks such as, by way of example and not limitation:
                    blockchain networks (whether private/permissioned or public)
                    courier companies, national postal services and other
                    delivery, telecommunications and other companies not under
                    our reasonable control, and third parties not under our
                    reasonable control providing services to the blockchain
                    industry generally, such as, by way of example and not
                    limitation, companies and other entities providing
                    processing and payment or transaction services (including
                    “Layer 2” or similar “roll-up” or optimisation services),
                    banking partners, custody services, market making services
                    and/or third party pricing services and decentralised
                    blockchain networks such as, by way of example and not
                    limitation, the blockchain(s) upon which any NFT depends or
                    forks of those blockchain(s).
                  </li>
                </ol>
              </li>
              <li>
                Compliance with laws – No monitoring responsibilities
                <ol type="i">
                  <li>
                    We will have no liability or responsibility for your
                    compliance with laws or regulations governing the transfer
                    and use of NFTs. Further, you are solely responsible for
                    compliance with all applicable requirements of any laws,
                    rules, and regulations of governmental authorities in Your
                    Jurisdiction.
                  </li>
                  <li>
                    You further acknowledge that neither we nor any of our
                    Personnel is, and will not be, by virtue of providing NFTs
                    to you, an advisor or fiduciary to you.
                  </li>
                </ol>
              </li>
              <li>
                No liability for Consequential Loss
                <ol type="i">
                  <li>
                    Neither party will be liable to the other for any Loss or
                    Claim in the nature of consequential or indirect loss,
                    including without limitation loss of prizes, loss of chance,
                    loss of expectations, or loss or opportunity.
                  </li>
                </ol>
              </li>
              <li>
                Liability Cap
                <ol type="i">
                  <li>
                    Our total liability to you under any circumstances is
                    limited to
                    <ol type="A">
                      <li>
                        the amount for which an NFT was originally sold by us ;
                        or
                      </li>
                      <li>
                        the amount of Commission we received for a Breeding
                        service for NFTs created through Breeding;
                      </li>
                    </ol>
                    and we shall not be liable for any amount above these sums.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <br />
          <b>GENERAL CONDITIONS</b>
          <li>
            Tax
            <ol type="a">
              <li>
                The price for any transaction in GRANDERBY (including the
                Purchase Price) will be considered to be inclusive of any
                applicable Sales Tax.
              </li>
              <li>
                If any additional Sales Tax is applicable by virtue of any law
                under Your Jurisdiction, you agree to pay such amount as is
                payable on behalf of us, and inform us of that payment
                forthwith.
              </li>
              <li>
                Any reference to a cost or expense incurred by a party in these
                Terms excludes any amount of Sales Tax forming part of the
                relevant cost or expense when incurred by the party for which
                the party can claim an input tax credit.
              </li>
              <li>
                Each party is solely responsible for any taxation which arises
                as a result of dealing in the NFTs, including capital gains or
                income tax and no party shall have a Claim for any Loss against
                the other in respect of any taxation amounts however arising.
              </li>
            </ol>
          </li>
          <li>
            Notices
            <ol type="a">
              <li>
                Unless a provision of these Terms expressly state otherwise, a
                notice, consent, approval, waiver or other communication
                (notice) in connection with these Terms must be in writing and
                in English and sent to, in the case of us, our nominated email
                or via the GRANDERBY interface, of in the case of you, to your
                nominated email or published on the GRANDERBY website with
                public access to such notice.
              </li>
              <li>
                Any notice will be deemed to be received within 24 hours of
                sending the electronic message (unless a rejection message is
                received) or publication online.
              </li>
              <li>
                A party must immediately notify the other party in writing of
                any changes to its contact details.
              </li>
            </ol>
          </li>
          <li>
            Disputes
            <ol type="a">
              <li>
                Proceedings suspended
                <ol type="i">
                  <li>
                    You must not begin legal proceedings in connection with a
                    dispute arising out of or in connection with these Terms
                    unless the steps in this clause 36 have been followed.
                    However, this limitation does not apply:
                    <ol type="i">
                      <li>
                        to a party who wants to apply for equitable relief or
                        urgent interlocutory relief; or
                      </li>
                      <li>
                        to a party who attempts in good faith to comply with
                        clauses b, c and d but cannot do so because the other
                        party does not comply with those clauses.
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                Notice of dispute
                <ol type="i">
                  <li>
                    If a dispute arises out of or in connection with these Terms
                    (including the validity, breach or termination of it), a
                    party may notify the other party to the dispute. The notice
                    must specify the dispute and indicate that the notifying
                    party wants the dispute to be referred to mediation.
                  </li>
                </ol>
              </li>
              <li>
                Commencement of mediation
                <ol type="i">
                  <li>
                    If the dispute is not resolved within 10 Business Days after
                    a notice under clause b has been served (Notice Period), the
                    dispute is by this clause c submitted to mediation.
                  </li>
                  <li>
                    The mediation must be conducted in New South Wales,
                    Australia in accordance with the mediation guidelines /
                    rules of the Resolution Institute, save any process in these
                    Terms which is inconsistent with those guidelines or rules
                    will take precedence to the extent of any inconsistency.
                  </li>
                  <li>
                    If the parties have not agreed on the mediator and the
                    mediator’s remuneration within <b>5 Business Days</b> after
                    the end of the Notice Period:
                    <ol type="i">
                      <li>the mediator is the person appointed by; and</li>
                      <li>
                        the remuneration of the mediator is the amount or rate
                        determined by, the President of the Law Society of New
                        South Wales or the President’s nominee, acting on the
                        request of any party.
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                If dispute not resolved
                <ol type="i">
                  <li>
                    If the dispute is not resolved within 1 month after the
                    appointment of the mediator, you may take legal proceedings
                    in connection with the dispute.
                  </li>
                </ol>
              </li>
              <li>
                Confidentiality
                <ol type="i">
                  <li>
                    Each party must keep confidential, all information relating
                    to the subject matter of a dispute as disclosed during or
                    for the purposes of dispute resolution under this clause 36,
                    unless that party is compelled by an regulatory or
                    government authority, court or tribunal to disclose that
                    information.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
          <li>
            Governing law and jurisdiction
            <br />
            These Terms are governed by the laws of New South Wales and
            Australia. The parties irrevocably submit to the exclusive
            jurisdiction of the courts of New South Wales and the New South
            Wales division of the Federal Court of New South Wales and the
            courts of appeal from them.
          </li>
          <li>
            Amendment
            <br />
            We reserve the right to amend these Terms from time to time in our
            absolute discretion. Amendments will be effective as soon as such
            changes are notified to you in writing from time to time.
          </li>
          <li>
            Precedence
            <br />
            Where there is inconsistency between the Terms and other content
            displayed as part of the GRANDERBY Platform concerning the sale of
            NFTs, the content of the Terms will prevail to the extent of any
            inconsistency.
          </li>
          <li>
            Force Majeure
            <br />
            We will not be liable for any delay or failure to perform our
            obligations under these Terms if such delay is due to any
            circumstances beyond our reasonable control (including but not
            limited to epidemics, pandemics, blockchain congestion or attacks,
            Government sanctions or orders, whether known or unknown at the time
            the parties enter into these Terms) (<b>Force Majeure Event</b>).
          </li>
          <li>
            Waiver
            <br />A provision of these Terms or a right created under it may not
            be waived except in writing signed by the party granting the waiver.
          </li>
          <li>
            Exercise of a right
            <br />A party may exercise a right at its discretion and separately
            or together with another right. If a party exercises a single right
            or only partially exercises a right, then that party may still
            exercise that right or any other right later. If a party fails to
            exercise a right or delays in exercising a right, then that party
            may still exercise that right later.
          </li>
          <li>
            Remedies cumulative
            <br />
            The rights and remedies provided in these Terms are cumulative with
            and not exclusive of the rights and remedies provided by law
            independently of these Terms.
          </li>
          <li>
            No merger
            <br />
            The rights and obligations of the parties (including under the
            warranties) will not merge on completion of any transaction under
            these Terms. They will survive the execution and delivery of any
            assignment or other document entered into for the purpose of
            implementing any transaction.
          </li>
          <li>
            Assignment
            <ol type="a">
              <li>
                These Terms are for the benefit of the parties and their
                successors and assigns. The parties and their successors and
                assigns are bound by these Terms.
              </li>
              <li>
                To the extent that any party purchases an NFT from you, they are
                deemed to have taken an assignment of these Terms as published
                at the time of the purchase and you must provide that party with
                a link or copy of these Terms.
              </li>
              <li>
                We may assign our rights under these Terms without your consent
                at any time by giving you written notice.
              </li>
            </ol>
          </li>
          <li>
            Severance
            <br />
            If any provision of these Terms are void, voidable, unenforceable,
            illegal, prohibited or otherwise invalid in a jurisdiction, in that
            jurisdiction the provision must be read down to the extent it can be
            to save it but if it cannot be saved by reading it down, words must
            be severed from the provision to the extent they can be to save it
            but if that also fails to save it the whole provision must be
            severed. That will not invalidate the remaining provisions of these
            Terms nor affect the validity or enforceability of that provision in
            any other jurisdiction where it is not invalid.
          </li>
          <li>
            Entire agreement
            <ol type="a">
              <li>
                These Terms constitute the entire agreement of the parties in
                respect of the subject matter of these Terms and supersedes all
                prior discussions, representations, undertakings and agreements.
              </li>
              <li>
                None of our agents or representatives are authorised to make any
                representations, conditions or agreements not expressed by us in
                writing nor are we bound by any such statements.
              </li>
            </ol>
          </li>
          <li>
            Further assurances
            <br />
            Each party must, at its own expense, do everything reasonably
            necessary to give effect to these Terms and the transactions
            contemplated by it, including but not limited to the execution of
            documents.
          </li>
          <li>
            Relationship
            <br />
            Nothing in these Terms constitutes the parties as partners or agents
            of the other and no party has any authority to bind the other
            legally or equitably save as expressly stated in these Terms.
          </li>
          <li>
            Knowledge
            <br />
            In these Terms, a reference to the awareness or knowledge by you is
            a reference to the actual knowledge, information and belief you have
            as at the date of any transaction taking place pursuant to these
            Terms.
          </li>
          <li>
            Costs
            <br />
            Each party must pay its own fees, costs and expenses incurred by it
            incident to or in connection with the negotiation, preparation,
            execution, delivery and completion of these Terms and the
            transactions contemplated by these Terms including without
            limitation its own legal, accounting and corporate advisory fees.
          </li>
          <li>
            Definitions
            <br />
            In these Terms:
            <br />
            <br />
            <b>Art</b> means any art, design, wording and drawings that are
            associated with an NFT that you Own;
            <br />
            <br />
            <b>Breed</b> means the creation of an NFT racehorse, as set out in
            clauses 7, 8 and 9;
            <br />
            <br />
            <b>Business Day</b> means any day except a Saturday or a Sunday or
            other public holiday in New South Wales, Australia;
            <br />
            <br />
            <b>Claim</b> includes a claim, notice, demand, action, proceeding,
            litigation, investigation, however arising whether present,
            unascertained, immediate, future or contingent, whether based in
            contract, tort or statute and whether involving a third party or a
            party to these Terms and where and to the extent the context
            permits, includes all associated Loss;
            <br />
            <br />
            <b>Confidential Information</b> means:
            <ol type="a">
              <li>
                information, in any form, relating to a party’s business
                including but not limited to any products, fees, markets,
                operations, processes, techniques, technology, forecasts or
                strategies; and
              </li>
              <li>
                negotiations in relation to, and the terms of, these Terms,{' '}
              </li>
              <br />
              but not:
              <li>
                information in the public domain other than because of a breach
                of these Terms; or{' '}
              </li>
              <li>
                information already known to a party prior to the disclosure by
                the other party;{' '}
              </li>
            </ol>
            <br />
            <b>Corporations Act</b> means the Corporations Act 2001 (Cth);
            <br />
            <br />
            <b>Digital Currency</b> means a cryptographically secured virtual
            currency or virtual asset which we identify as an acceptable means
            of payment or transacting with us;
            <br />
            <br />
            <b>Digital Wallet</b> means the applicable “Metamask” location,
            public key or wallet address, account or storage device which we
            choose to support for the delivery of the NFTs provided by us;
            <br />
            <br />
            <b>Digital Wallet</b> means the applicable “Metamask” location,
            public key or wallet address, account or storage device which we
            choose to support for the delivery of the NFTs provided by us;
            <br />
            <br />
            <b>Privacy Policy</b> means the privacy policy on the Website as may
            be varied from time to time.
            <br />
            <br />
            <b>Purchase Price</b> means the amount advertised for the purchase
            (or pre-purchase) of any NFT or bundle containing an NFT, which may
            be denominated in a Digital Currency;
            <br />
            <br />
            <b>Sales Tax</b> means any form of value added tax including GST as
            defined in section 195-1 of the A New Tax System (Goods and Services
            Tax) Act 1999 (Cth) or other similar sales tax;
            <br />
            <br />
            <b>Insolvency Event</b> means the happening of any of the following
            events in relation to a body corporate:
            <ol type="a">
              <li>
                the body corporate becomes an externally-administered body
                corporate;
              </li>
              <li>
                a person is appointed a controller (as defined in section 9 of
                the Corporations Act), administrator, receiver, provisional
                liquidator, trustee for creditors in bankruptcy or an analogous
                appointment is made in respect of the body corporate;
              </li>
              <li>
                in Australia, the body corporate is taken to have failed to
                comply with a statutory demand within the meaning of section
                459F of the Corporations Act;
              </li>
              <li>
                the body corporate suspends payment of its debts, or enters, or
                takes any step towards entering, a compromise or arrangement
                with, or assignment for the benefit of, any of its members or
                creditors;
              </li>
              <li>
                a secured creditor of the body corporate enforces its security
                in relation to its debt for an amount in excess of $50,000; or
              </li>
              <li>
                the body corporate is, or its directors state that it is, unable
                to pay its debts as and when they become due and payable;
              </li>
            </ol>
            <br />
            <br />
            <b>Intellectual Property</b> means any and all intellectual property
            in the NFT and the Art including all copyright, patents, trade
            marks, business names, domain names, trading styles, get-up,
            designs, knowhow, processes, methodologies and all current and
            future registered and unregistered rights, development or
            enhancement of the Intellectual Property owned by us or by our
            licensors.
            <br />
            <br />
            <b>Intellectual Property Rights</b> means all present and future
            intellectual and industrial property rights conferred by statute, at
            common law or in equity and wherever existing, including:
            <ol type="a">
              <li>
                patents, inventions, discoveries, designs, copyright, trade
                marks, trade names, brand names, business names, product names,
                domain names or rights in designs, art, images, drawings, know
                how, product names, trade secrets and any other rights
                subsisting in the results of intellectual effort in any field,
                whether or not registered or capable of registration;
              </li>
              <li>
                any application or right to apply for registration of any of
                these rights or other rights of a similar nature arising or
                capable of arising under statute or at common law anywhere in
                the world;{' '}
              </li>
              <li>
                other intellectual property as defined in Article 2 of the
                Convention Establishing the World Intellectual Property
                Organisation 1967;
              </li>
              <li>
                any registration of any of those rights or any registration of
                any application referred to in paragraph (b.); and
              </li>
              <li>all renewals and extensions of these rights;</li>
            </ol>
            <br />
            <br />
            <b>Loss</b> includes and loss, damage, cost, charge, liability or
            expense (including legal costs and expenses);
            <br />
            <br />
            <b>Marketplace</b> means a software platform or software (including
            a Blockchain digital wallet) which permits the transfer, purchase or
            sale of an NFT, provided that the Marketplace at all times
            cryptographically verifies the NFT owner’s right to Own the NFT.
            <br />
            <br />
            <b>NFT</b> means a non-fungible token issued by MOMOCON for use in
            GRANDERBY.
            <br />
            <br />
            <b>NFT Terms</b> mean the terms and conditions of these Terms that
            specifically relate to the purchase and ownership of NFTs in
            particular clauses 20-33.
            <br />
            <br />
            <b>Own</b> means, with respect to an NFT, any NFT we have issued
            where proof of ownership is recorded on a blockchain system and you
            control the private key associated with a Digital Wallet to which
            the NFT is associated or located;
            <br />
            <br />
            <b>Personnel</b> means any employee, contractor, subcontractor,
            agent, partner, shareholder, ultimate beneficial owner, director or
            officer of a party;
            <br />
            <br />
            <b>Procure</b> means to obtain, and includes to Breed;
            <br />
            <br />
            <b>Purchaser Warranties</b> means the warranties set out in clause
            26.(b.).
            <br />
            <br />
            <b>Your Jurisdiction</b> means the country or state where you are
            ordinarily resident or from which you enter into any agreement with
            us.
            <br />
            <br />
            <b>Website</b> means{' '}
            <AnchorLink href="https://granderby.io">
              https://granderby.io
            </AnchorLink>{' '}
            and/or any other website MOMOCON may operate from time to time.
            <br />
            <br />
            <b>Website Terms</b> means the terms and conditions on the Website
            (if any) as may be varied from time to time
            <br />
            <br />
            <b>GRANDERBY</b> means the GRANDERBY online game and associated
            software interfaces for that game, including the home website for
            GRANDERBY, elements of which are located on the Ethereum Blockchain.
          </li>
        </ol>
      </div>
    </div>
  );
};

MintPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default MintPage;
