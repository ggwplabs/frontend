import React from 'react';
import cl from "./EpochCards.module.css";
import ActualEpoch from "./ActualEpoch";
import Epoch from "./Epoch";

const EpochCards = ({info}) => {

    const numEpoch = (info.aprStart - info.aprEnd) / info.aprStep;
    const Actualepoch =  ((Date.now() /1000 |0) - info.startTime) / (info.epochPeriodDays * 86400) |0;
    const cards = [];

    switch (Actualepoch) {
        case 1: {
            cards.push(
                <ActualEpoch
                    key={0}
                    epoch={Actualepoch}
                    start={info.startTime}
                    end={info.startTime + (info.epochPeriodDays * 86400)}
                    apr={info.aprStart}
                />
            )
            for (let i = 1; i < 5; i++) {
                cards.push(
                    <Epoch
                        key={i}
                        epoch={i + 1}
                        isFuture={true}
                        time={info.startTime + (info.epochPeriodDays * 86400) * i}
                        apr={info.aprStart - info.aprStep * (i)}
                    />
                )
            }
            break;
        }
        case 2: {
            cards.push(
                <Epoch
                    key={0}
                    epoch={1}
                    isFuture={false}
                    time={info.startTime + (info.epochPeriodDays * 86400)}
                    apr={info.aprStart}
                />
            )
            cards.push(
                <ActualEpoch
                    key={1}
                    epoch={Actualepoch}
                    start={info.startTime + (info.epochPeriodDays * 86400)}
                    end={info.startTime + ((info.epochPeriodDays * 86400) * 2)}
                    apr={info.aprStart - info.aprStep}
                />
            )
            for (let i = 2; i < 5; i++) {
                cards.push(
                    <Epoch
                        key={i}
                        epoch={i + 1}
                        isFuture={true}
                        time={info.startTime + (info.epochPeriodDays * 86400) * (i + 1)}
                        apr={info.aprStart - info.aprStep * i}
                    />
                )
            }
            break;
        }
        case numEpoch - 1: {
            for (let i = 0; i < 3; i++) {
                cards.push(
                    <Epoch
                        key={i}
                        epoch={numEpoch - (4 - i)}
                        isFuture={false}
                        time={info.startTime + ((info.epochPeriodDays * 86400) * (numEpoch - (4 - i)))}
                        apr={info.aprStart - (info.aprStep * (numEpoch - (5 - i)))}
                    />
                )
            }
            cards.push(
                <ActualEpoch
                    key={3}
                    epoch={numEpoch - 1}
                    start={info.startTime + ((info.epochPeriodDays * 86400) * (numEpoch - 2))}
                    end={info.startTime + ((info.epochPeriodDays * 86400) * (numEpoch - 1))}
                    apr={info.aprStart - (info.aprStep * (numEpoch - 2))}
                />
            )
            cards.push(
                <Epoch
                    key={4}
                    epoch={numEpoch}
                    isFuture={true}
                    time={info.startTime + ((info.epochPeriodDays * 86400) * (numEpoch - 1))}
                    apr={info.aprStart - info.aprStep * (numEpoch - 1)}
                />
            )
            break;
        }
        case numEpoch: {
            for (let i = 0; i < 4; i++) {
                cards.push(
                    <Epoch
                        key={i}
                        epoch={numEpoch - (4 - i)}
                        isFuture={false}
                        time={info.startTime + ((info.epochPeriodDays * 86400) * (numEpoch - (4 - i)))}
                        apr={info.aprStart - (info.aprStep * numEpoch - (5 - i))}
                    />
                )
            }
            cards.push(
                <ActualEpoch
                    key={4}
                    epoch={numEpoch}
                    start={info.startTime + ((info.epochPeriodDays * 86400) * (numEpoch - 1))}
                    end={info.startTime + ((info.epochPeriodDays * 86400) * (numEpoch))}
                    apr={info.aprStart - (info.aprStep * (numEpoch - 1))}
                />
            )
            break;
        }
        default: {
            for (let i = Actualepoch - 2; i < Actualepoch + 3; i++) {
                if (i === Actualepoch) {
                    cards.push(
                        <ActualEpoch
                            key={i}
                            epoch={i}
                            start={info.startTime + ((info.epochPeriodDays * 86400) * (i))}
                            end={info.startTime + ((info.epochPeriodDays * 86400) * (i + 1))}
                            apr={info.aprStart - (info.aprStep * (i - 1))}
                        />
                    )
                } else if (i < Actualepoch) {
                    cards.push(
                        <Epoch
                            key={i}
                            epoch={i}
                            isFuture={false}
                            time={info.startTime + (info.epochPeriodDays * 86400 * i)}
                            apr={info.aprStart - (info.aprStep * (i - 1))}
                        />
                    )
                } else {
                    cards.push(
                        <Epoch
                            key={i}
                            epoch={i}
                            isFuture={true}
                            time={info.startTime + (info.epochPeriodDays * 86400 * i)}
                            apr={info.aprStart - (info.aprStep * (i - 1))}
                        />
                    )
                }
            }
        }
            break;
    }
    return (
        <div className={cl.Epoch_list}>
            {cards}
        </div>
    );
};

export default EpochCards;