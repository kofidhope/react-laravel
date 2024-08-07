<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        // Get validated data
        $data = $request->validated();
            /** @var \App\Models\User $user */
        // Create user and hash the password
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // Generate a token for the user
        $token = $user->createToken('main')->plainTextToken;

        // Return response with user and token
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        // Get validated data
        $credentials = $request->validated();

        // Attempt to log in with provided credentials
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email address or password is incorrect'
            ], 422);
        }
        /** @var User $user */
        // Get authenticated user
        $user = Auth::user();

        // Generate a token for the user
        $token = $user->createToken('main')->plainTextToken;

        // Return response with user and token
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        // Get authenticated user
        $user = $request->user();

        // Delete the user's current access token
        $user->currentAccessToken()->delete();

        // Return a 204 No Content response
        return response('', 204);
    }

}
