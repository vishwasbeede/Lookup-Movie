import React from 'react'

export default function Notfound() {
    return (
        <div>

            <p style={{ textAlign: 'center', fontFamily: 'monospace', color: 'red', fontSize: "45px" }}>
                404 Page not found
            </p>
            <div
                style={{ textAlign: 'center', color: 'brown', alignContent: 'center' }}>
                <small>
                    <a href="https://www.error404.com">
                        Please check the page you are visiting
                    </a>
                </small>
            </div>

        </div>
    )
}
