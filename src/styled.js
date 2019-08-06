import styled from 'styled-components'


// export const LoadingIndicator = styled.img`
// `

export const UserContainer = styled.div`
    margin: 1em 0;
    background-color: rgb(230, 227, 227);

    .userInfo {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 1em;

        .username {
            color: blue;
            font-weight: bold;
        }

        .profileImg {
            height: 100px;
            width: 100px;
            border-radius: 50%;
        }
    }
`

export const UserImagesContainer = styled.div`
    margin: 1em 0;

    img {
        height: 150px;
        width: 200px;
        margin: 0.5em;
    }
`

export const UserPage = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;

    .userInfo {
        display: flex;
        align-items: center;
    }
    
    .profileImg {
        height: 20%;
        width: 20%;
    }
    
    .username {
        margin: 1em;
    }
`

export const SelfProfilePage = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;

    .userInfo {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .profileImg {
            height: 20%;
            width: 20%;
        }

        .username {
            margin: 1em;
            text-align: center;
        }

        .uploadPage {
            height: 300px;
            width: 150px;
        }
    }
`

