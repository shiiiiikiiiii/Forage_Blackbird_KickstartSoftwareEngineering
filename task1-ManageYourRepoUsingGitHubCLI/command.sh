# REPO_URL https://github.com/shiiiiikiiiii/test-react-app
gh repo create test-react-app

git init
git add .
git commit -m "first commit"
# main branch is the same as master
git branch -M main
git remote add origin https://github.com/shiiiiikiiiii/test-react-app.git
git push --set-upstream origin main

git branch update_logo
git checkout update_logo
git add .
git push --set-upstream origin update_logo

git pull
gh pr create --base main --head update_logo --title "Update logo"

git checkout main
gh pr list
gh pr merge 1