const data = {
    protocols: [
        {
            protocolNumber: 'Prot-ABCDE',
            protocolDescription: 'A Multicenter, Randomized, Phase lb/II Trail to Evaluate the Efficacy, Safety',
            indication: 'Covid-19',
            phase: '2',
            sponsor: 'Eli Lilly',
            sourceDocument: 'Prot-ABCDE.pdf',
            molecule: 'Sample Drug',
            approvalDate: '05/05/2020',
            followed: true,

            rows: [
                {
                    olderVersion: 'Protocol-ABDCD',
                    sourceDocument: 'Prot-ABCDE-v12.pdf',
                    uploadDate: '05/05/2020',
                    version: '1.2',
                    documentStatus: 'Draft',
                },
                {
                    olderVersion: 'Protocol-ABDCD',
                    sourceDocument: 'Prot-ABCDE-v11.pdf',
                    uploadDate: '01/01/2020',
                    version: '1.1',
                    documentStatus: 'Final Approved',
                },
                {
                    olderVersion: 'Protocol-ABDCD',
                    sourceDocument: 'Prot-ABCDE-v1.pdf',
                    uploadDate: '01/10/2019',
                    version: '1.0',
                    documentStatus: 'Final Approved',
                },
            ]
        },
        {
            protocolNumber: 'Prot-ABCDE-New',
            protocolDescription: 'A Multicenter, Randomized, Phase lb/II Trail to Evaluate the Efficacy, Safety',
            indication: 'Covid-19',
            phase: '2',
            sponsor: 'Eli Lilly',
            sourceDocument: 'Prot-ABCDE.pdf',
            molecule: 'Sample Drug',
            approvalDate: '05/05/2020',
            followed: false,

            rows: [
                {
                    olderVersion: 'Protocol-ABDCD',
                    sourceDocument: 'Prot-ABCDE-v12.pdf',
                    uploadDate: '05/05/2020',
                    version: '1.2',
                    documentStatus: 'Draft',
                },
                {
                    olderVersion: 'Protocol-ABDCD',
                    sourceDocument: 'Prot-ABCDE-v11.pdf',
                    uploadDate: '01/01/2020',
                    version: '1.1',
                    documentStatus: 'Final Approved',
                },
                {
                    olderVersion: 'Protocol-ABDCD',
                    sourceDocument: 'Prot-ABCDE-v1.pdf',
                    uploadDate: '01/10/2019',
                    version: '1.0',
                    documentStatus: 'Final Approved',
                },
            ]
        }

    ]

};


export default data;