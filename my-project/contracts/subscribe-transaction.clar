// contracts/subscribe-transaction.clar

(define-constant subscription-fee u5) ;; Subscription fee (e.g., 5 tokens)
(define-constant receiver 'SP2EXAMPLEADDRESS) ;; Replace with your recipient address

;; Define a map to store subscriptions
(define-map subscriptions
  { subscriber: principal }
  { subscribed: bool })

;; Public function to subscribe
(define-public (subscribe)
  (begin
    ;; Transfer tokens from the subscriber to the receiver
    (let ((payment (stx-transfer? subscription-fee tx-sender receiver)))
      (if (is-ok payment)
        (begin
          ;; Update the subscription map to mark the user as subscribed
          (map-set subscriptions { subscriber: tx-sender } { subscribed: true })
          (ok "Subscription successful"))
        (err "Payment failed")))
  )
)

;; Read-only function to check if a user is subscribed
(define-read-only (is-subscribed (user principal))
  (default-to { subscribed: false }
    (map-get? subscriptions { subscriber: user })))