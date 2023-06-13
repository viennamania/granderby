import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import votePool from '@/assets/images/vote-pool.svg';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

//import movIntro from '@/assets-landing/mov/intro.mp4';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';
import IcoApple from '@/assets-landing/images/ico-apple.svg';
import IcoAndroid from '@/assets-landing/images/ico-android.svg';
import IcoScrolldown from '@/assets-landing/images/ico-scrolldown.svg';

import phonePC from '@/assets-landing/images/img-app.png';
import phoneMobile from '@/assets-landing/images/0_asset.png';

import {
  nftDropContractAddressHorse,
  stakingContractAddressHorseAAA,
  tokenContractAddressGRD,
} from '../../config/contractAddresses';

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

const ProposalsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { layout } = useLayout();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const { totalVote: totalOffChainVote } = getVotesByStatus('off-chain');
  const { totalVote: totalExecutableVote } = getVotesByStatus('executable');
  const { totalVote: totalPastVote } = getVotesByStatus('past');

  const address = useAddress();

  const { contract: tokenContract } = useContract(
    tokenContractAddressGRD,
    'token'
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  {
    /*
  useEffect(() => {
    Array.from(document.getElementsByTagName("iframe")).forEach((iframe) => {
      iframe?.contentWindow?.addEventListener(
        "load",
        () => {
          const doc = iframe.contentWindow?.document;
          iframe.height = doc?.body.scrollHeight;
        },
        true
      );
      iframe.contentWindow.addEventListener(
        "resize",
        () => {
          iframe.height = iframe?.contentWindow?.document?.body?.scrollHeight + 40;
        },
        true
      );
    });
  }, []);
*/
  }

  return (
    <>
      <NextSeo
        title="Landing"
        description="Granderby - NFT Horse Racing Game"
      />

      <link rel="stylesheet" href="assets-game/css/game.css" />

      <div>
        <div id="horse1" className="horse standRight">
          <div className="rider">
            <div className="head"></div>
            <div className="body"></div>
          </div>
        </div>
        <div id="horse2" className="horse standRight">
          <div className="rider">
            <div className="head"></div>
            <div className="body"></div>
          </div>
        </div>
        <div id="horse3" className="horse standRight">
          <div className="rider">
            <div className="head"></div>
            <div className="body"></div>
          </div>
        </div>
        <div id="horse4" className="horse standRight">
          <div className="rider">
            <div className="head"></div>
            <div className="body"></div>
          </div>
        </div>
        <div className="track">
          <div id="startline"></div>
          <div className="inner">
            <button id="start">Start Race</button>
            {/* Make it a button */}
            <div id="bet">
              <p>
                You currently have <span id="funds">100</span>
              </p>
              <label>Bet Amount (£)</label>
              <input type="number" id="amount" defaultValue={0} />
              {/* Add type and default value */}
              <label>Bet on horse:</label>
              <select id="bethorse">
                <option value={1}>White</option>
                <option value={2}>Blue</option>
                <option value={3}>Green</option>
                <option value={4}>Brown</option>
              </select>
              <label>Number of lap</label>
              {/* Add Number of Laps */}
              <input
                type="number"
                id="num_lap"
                name="num_lap"
                defaultValue={1}
              />
              {/* Number of Laps text box to get number of Laps */}
            </div>
            <img src="assets-game/images/tree.png" className="tree" />
            <br />
            <table id="results">
              <thead>
                <tr>
                  <th>Results</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st</td>
                  <td className="result horse1" />
                </tr>
                <tr>
                  <td>2nd</td>
                  <td className="result horse2" />
                </tr>
                <tr>
                  <td>3rd</td>
                  <td className="result horse3" />
                </tr>
                <tr>
                  <td>4th</td>
                  <td className="result horse4" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProposalsPage;
