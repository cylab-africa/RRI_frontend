import React from "react";

const OverviewCard = ({
    title,
    total,
    increments
}) => {
    return (
        <div className='overview-card'
            style={{
                backgroundColor: title === 'evaluations' ? '#E3F5FF' :
                    title === 'projects' ? '#E5ECF6' :
                        title === 'new users' ? '#E3F5FF' : '#E5ECF6'
            }}>
            <div><p
                style={{
                    color: '#1C1C1C',
                    paddingTop: '20px',
                    fontSize: '13px',
                    textTransform: 'capitalize'
                }}>{title}</p></div>
            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'baseline'
                }}>
                <span style={{
                    paddingLeft: '20px',
                    fontWeight: '600'
                }}>
                    {total}
                </span>
                <span
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                    <p
                        style={{
                            fontSize: '10px',
                            marginLeft: '0px'
                        }}>{(increments >= 0) ? `+${increments}`
                            : `${increments}`}</p>
                    <p style={{
                        marginLeft: '0px'
                    }}>
                        {(increments >= 0) ?
                            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.73908 2.29355L13.391 0.6548L11.9843 6.36892L10.2293 4.68417L7.39846 7.63298C7.30236 7.73308 7.16959 7.78967 7.03082 7.78967C6.89205 7.78967 6.75928 7.73308 6.66318 7.63298L4.58458 5.46777L1.52749 8.65224C1.33256 8.85529 1.00995 8.86187 0.806904 8.66695C0.603861 8.47203 0.597277 8.14941 0.792199 7.94637L4.21694 4.37893C4.31304 4.27882 4.44581 4.22224 4.58458 4.22224C4.72335 4.22224 4.85612 4.27882 4.95222 4.37893L7.03082 6.54414L9.49403 3.9783L7.73908 2.29355Z" fill="#1C1C1C" />
                            </svg> : <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1133 0.287148C13.3164 0.48207 13.323 0.804685 13.128 1.00773L9.70329 4.57516C9.60719 4.67527 9.47442 4.73186 9.33565 4.73186C9.19688 4.73186 9.06411 4.67527 8.968 4.57516L6.88941 2.40996L4.4262 4.9758L6.18114 6.66055L0.529177 8.2993L1.93596 2.58518L3.69091 4.26993L6.52176 1.32112C6.61787 1.22101 6.75063 1.16442 6.88941 1.16442C7.02818 1.16442 7.16095 1.22101 7.25705 1.32112L9.33565 3.48633L12.3927 0.301854C12.5877 0.0988099 12.9103 0.0922259 13.1133 0.287148Z" fill="#1C1C1C" />
                            </svg>
                        }

                    </p>
                </span>
            </div>
        </div>
    )
};
export default OverviewCard;