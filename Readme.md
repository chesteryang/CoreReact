1. Create CoreReact solution in Visual Studio 2017 using Asp.net Core React & Redux template.
   
2. Delete content of the folder of ClientApp, 
	rename ClientApp to clientapp including folder name, Startup.cs and CoreReact.csproj
	(npm naming restrictions - name can no longer contain capital letters)

3. Shut down Visual Studio 2017.	

4. Make sure npm - create-react-app is the latest global.

5. Go to the parent folder of clientapp, 
    create react app following https://github.com/wmonk/create-react-app-typescript by running
	in cmd.exe.
	
	create-react-app clientapp --scripts-version=react-scripts-ts
	
6. in the folder of clientapp, 
	
    npm start. make sure react app is loaded at http://localhost:3000
	npm test. pass tests.

7. Start Visual Studio 2017, open CoreReact solution and make sure it is able to debug run.

8. Start Visual Studio Code, open the folder where CoreReact.sln is in. 
	a. Waiting Visual Studio Code to add .vscode folder and config files.
	b. open integrated terminal, check OmniSharp Log for C# extension loading. 
	c. F5 to start debugging, check http://localhost:5000 in Chrome. 
	d. F12 to browse webpack source codes.
	e. Open CoreReact\clientapp\src\App.tsx, change h1 from 'Welcome to React' to 
	    'Welcome to Asp.net Core React', save, the result should be shown on the page.

9. Create git repo and commit all changes.

10. Upload to Github

11. Add xml document for the project. Visual Studio 2017, project Properties -> Build -> Check "Xml documentation file"

12. Add nuget packages for Swagger, add Swagger to show api endpoints.
    http://localhost:5000/swagger
	
13. In Visual Studio 2017, Add CoreReact.Northwind and CoreReact.Northwind.Tests project. Add required nuget packages.

14. Add Northwind.sqlite under CoreReact.Northwind/data. open cmd.exe and go to the folder of CoreReact.Northwind

15. Generate models and dbcontext.
	dotnet ef dbcontext scaffold "Data Source=data/Northwind.sqlite" Microsoft.EntityFrameworkCore.Sqlite -o model -p CoreReact.Northwind.csproj

	remove constructors of NorthwindContext.cs

16. Add controllers for Northwind model using scaffold template in Visual Studio 2017 

17. Add bootstrap 3, react-router-dom, react-bootstrap, react-router-bootstrap. In the folder of clientapp
```
    npm i bootstrap@3
	npm i -D @types/bootstrap@3
	npm i react-router-dom
	npm i -D @types/react-router-dom
	npm i react-bootstrap
	npm i -D @types/react-bootstrap
	npm i react-router-bootstrap
	npm i -D @types/react-router-bootstrap
```

18. Add redux (v3.7.2), react-redux, redux-thunk (2.2.0)

19. Home page loading -> loaded: redux state change. redux state change can be checked in Redux dev tool.

20. Add news component

21. Add NorthwindContainer, npm i redux-form, wire up Employee container.

22. Add more controllers

23. Add react table of Orders and Order details.

24. Add Chinook database project and its model and test project
	dotnet ef dbcontext scaffold "Data Source=data/chinook.db" Microsoft.EntityFrameworkCore.Sqlite -o model -p CoreReact.Chinook.csproj

	note: in order to run scaffold command, SQLitePCLRaw.bundle_green package is required.

25. Add Chinook controllers using Visual Studion 2017 controller scaffold template.

26. Add enzyme and snapshot testing.

27. Add VS code Jest debugging launch configuration. Add News component testing with redux store in place.
	Test coverage: npm test -- --coverage

28. expose un-connected component for shallow snapshot testing. 

29. While writing tests for customer components, it looks like 'fetch' in components is not a good choice, which makes testing tougher. Starting to write tests and refactor Employee components to move 'fetch' out. Api data can be localized in component state and it will not contaminate redux store and this could be an option.

30. Noticed that putting all tests under __tests__ folder generates a side effect that references in tests are too deep.

31. Move out 'fetch' from component to component design properties, while react-redux connect, the properites are also connected - refer to IApiFromProps in Employee.tsx.

32. Add new sale_records table to chinook database. save it.

33. complete chinook music store ordering.
34. Update git repo author info

35. useful command for Heroku deployment
```
dotnet publish -c Release
docker build -t corereactapp bin\Release\netcoreapp2.1\publish\
--local run
docker run --rm -it -p 5000:80 corereactapp

heroku login
heroku container:login
heroku apps:create corereactapp
docker tag corereactapp registry.heroku.com/corereactapp/web
docker push registry.heroku.com/corereactapp/web
heroku container:release web --app=corereactapp
```

