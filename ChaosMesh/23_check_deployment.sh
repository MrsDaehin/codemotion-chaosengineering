kubectl get -n chaos-sandbox deployments,pods,services  && minikube -p chaosworkshop ip


# to open the service in the browser
minikube -p chaosworkshop service shine-on-you-crazy-diamond-service -n chaos-sandbox


# to open a tunnel to the service
minikube tunnel -p chaosworkshop

# to test the service
curl http://127.0.0.1:80